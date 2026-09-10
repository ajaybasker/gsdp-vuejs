# Public, read-only Digital Repository endpoints for the gsdp-ui public site.
# Only ever returns Repository Resources with status = "Published" — the public-visibility gate.
import difflib

import frappe

ASSET_LIST_FIELDS = [
	"name", "title", "resource_code", "category", "collection",
	"publication_date", "status", "cover_image",
]

# Fields searched for a direct (substring) match, and used as the fuzzy-match haystack
# when no direct match is found (e.g. the user made a typo).
SEARCHABLE_FIELDS = ["title", "description", "category", "resource_code"]
# Note: `author`/`language` are Table MultiSelect fields (no column on this table), so they
# aren't searchable via a simple `like` filter here — see _attach_authors_and_languages below
# for how their values are resolved from the child tables for display.
# `resource_type` similarly no longer lives on the parent — every sub-resource (audio/video/
# image/document/...) is a row in the unified `resources` child table instead, each carrying
# its own resource_type — see _attach_resource_types below.

FUZZY_SCORE_THRESHOLD = 0.55


def _collect_child_values(rows, child_doctype, value_field):
	"""Group child-table rows (Table MultiSelect data) by their parent document."""
	names = [row["name"] for row in rows if row.get("name")]
	if not names:
		return {}
	entries = frappe.get_all(
		child_doctype, filters={"parent": ["in", names]},
		fields=["parent", value_field], order_by="idx asc", ignore_permissions=True,
	)
	grouped = {}
	for entry in entries:
		grouped.setdefault(entry["parent"], []).append(entry[value_field])
	return grouped


def _language_display_names(codes):
	"""Map Language doctype codes (e.g. "en") to their human-readable names."""
	codes = [c for c in set(codes) if c]
	if not codes:
		return {}
	return {
		row["name"]: row["language_name"]
		for row in frappe.get_all(
			"Language", filters={"name": ["in", codes]}, fields=["name", "language_name"],
			ignore_permissions=True,
		)
	}


def _attach_authors_and_languages(rows):
	"""Enrich list rows with `author` and `language` as display-ready lists of strings,
	since both are Table MultiSelect fields with no column on the parent table."""
	author_map = _collect_child_values(rows, "Author Items", "author_name")
	language_map = _collect_child_values(rows, "GSDP Language Items", "language")
	language_names = _language_display_names(
		code for codes in language_map.values() for code in codes
	)
	for row in rows:
		row["author"] = author_map.get(row["name"], [])
		row["language"] = [language_names.get(code, code) for code in language_map.get(row["name"], [])]
	return rows


def _attach_resource_types(rows):
	"""Enrich list rows with `resource_type`, derived from the distinct types of their
	`resources` child rows (each sub-resource — audio/video/image/document/... — carries
	its own resource_type since there's no single classification on the parent anymore)."""
	names = [row["name"] for row in rows if row.get("name")]
	types_map = {}
	if names:
		child_rows = frappe.get_all(
			"Resources",
			filters={"parent": ["in", names], "parenttype": "Repository Resource", "parentfield": "resources"},
			fields=["parent", "resource_type"], order_by="idx asc", ignore_permissions=True,
		)
		for entry in child_rows:
			types_map.setdefault(entry["parent"], [])
			if entry["resource_type"] and entry["resource_type"] not in types_map[entry["parent"]]:
				types_map[entry["parent"]].append(entry["resource_type"])
	for row in rows:
		row["resource_type"] = ", ".join(types_map.get(row["name"], []))
	return rows


def _restrict_by_child_table(allowed_names, child_doctype, field, value, parentfield):
	"""Intersect `allowed_names` (None = unrestricted) with parents of child rows matching value."""
	matching_names = frappe.get_all(
		child_doctype,
		filters={field: value, "parenttype": "Repository Resource", "parentfield": parentfield},
		pluck="parent",
		ignore_permissions=True,
	)
	if allowed_names is None:
		return set(matching_names)
	return allowed_names & set(matching_names)


@frappe.whitelist(allow_guest=True)
def list_assets(resource_type=None, category=None, collection=None, search=None, tag=None, author=None, limit=60):
	filters = {"status": "Published"}
	if category:
		filters["category"] = category
	if collection:
		filters["collection"] = collection

	allowed_names = None

	resource_type = (resource_type or "").strip()
	if resource_type:
		allowed_names = _restrict_by_child_table(allowed_names, "Resources", "resource_type", resource_type, "resources")

	tag = (tag or "").strip()
	if tag:
		allowed_names = _restrict_by_child_table(allowed_names, "Resource Tag Item", "tag", tag, "tags")

	author = (author or "").strip()
	if author:
		allowed_names = _restrict_by_child_table(allowed_names, "Author Items", "author_name", author, "author")

	if allowed_names is not None:
		if not allowed_names:
			return {"results": [], "fuzzy": False, "query": ""}
		filters["name"] = ["in", list(allowed_names)]

	limit = int(limit or 60)
	search = (search or "").strip()

	if not search:
		rows = frappe.get_all(
			"Repository Resource", filters=filters, fields=ASSET_LIST_FIELDS,
			order_by="publication_date desc", limit_page_length=limit,
			ignore_permissions=True,
		)
		return {"results": _attach_resource_types(_attach_authors_and_languages(rows)), "fuzzy": False, "query": ""}

	term = f"%{search}%"
	or_filters = [[field, "like", term] for field in SEARCHABLE_FIELDS]
	rows = frappe.get_all(
		"Repository Resource", filters=filters, or_filters=or_filters, fields=ASSET_LIST_FIELDS,
		order_by="publication_date desc", limit_page_length=limit,
		ignore_permissions=True,
	)
	if rows:
		return {"results": _attach_resource_types(_attach_authors_and_languages(rows)), "fuzzy": False, "query": search}

	# Nothing matched directly — likely a typo or unfamiliar wording. Fall back to a
	# similarity-ranked search across all published resources so the user still sees
	# relevant, "did you mean" style results instead of an empty page.
	candidates = frappe.get_all(
		"Repository Resource", filters=filters, fields=ASSET_LIST_FIELDS + ["description"],
		ignore_permissions=True,
	)
	rows = _fuzzy_rank(search, candidates, limit)
	for row in rows:
		row.pop("description", None)
	return {"results": _attach_resource_types(_attach_authors_and_languages(rows)), "fuzzy": True, "query": search}


def _fuzzy_rank(search, candidates, limit):
	query = search.lower()
	query_words = query.split()
	scored = []
	for row in candidates:
		haystack = " ".join(str(row.get(f) or "") for f in SEARCHABLE_FIELDS).lower()
		score = difflib.SequenceMatcher(None, query, haystack).ratio()
		for word in query_words:
			for hay_word in haystack.split():
				score = max(score, difflib.SequenceMatcher(None, word, hay_word).ratio())
		if score >= FUZZY_SCORE_THRESHOLD:
			scored.append((score, row))
	scored.sort(key=lambda pair: pair[0], reverse=True)
	return [row for _, row in scored[:limit]]


@frappe.whitelist(allow_guest=True)
def get_asset(name):
	if not frappe.db.exists("Repository Resource", name):
		frappe.throw("Resource not found", frappe.DoesNotExistError)
	resource = frappe.get_doc("Repository Resource", name)
	if resource.status != "Published":
		frappe.throw("Resource is not publicly available", frappe.PermissionError)

	resource_dict = resource.as_dict()
	resource_dict["files"] = []
	resource_dict["tags"] = [
		row.get("tag") for row in (resource_dict.get("tags") or []) if row.get("tag")
	]
	resource_dict["author"] = [
		row.get("author_name") for row in (resource_dict.get("author") or []) if row.get("author_name")
	]
	language_codes = [
		row.get("language") for row in (resource_dict.get("language") or []) if row.get("language")
	]
	language_names = _language_display_names(language_codes)
	resource_dict["language"] = [language_names.get(code, code) for code in language_codes]
	resource_dict["rights"] = None

	related_filters = {"status": "Published", "category": resource.category, "name": ["!=", name]}
	related = frappe.get_all(
		"Repository Resource", filters=related_filters, fields=ASSET_LIST_FIELDS,
		limit_page_length=4, ignore_permissions=True,
	)
	resource_dict["related"] = _attach_resource_types(_attach_authors_and_languages(related))
	return resource_dict


@frappe.whitelist(allow_guest=True)
def list_collections():
	return frappe.get_all(
		"Repository Collection", filters={"is_active": 1},
		fields=["name", "collection_name", "collection_id", "description", "start_date", "end_date"],
		order_by="collection_name asc", ignore_permissions=True,
	)


@frappe.whitelist(allow_guest=True)
def get_collection(name):
	if not frappe.db.exists("Repository Collection", name):
		frappe.throw("Collection not found", frappe.DoesNotExistError)
	collection = frappe.get_doc("Repository Collection", name).as_dict()
	resources = frappe.get_all(
		"Repository Resource", filters={"collection": name, "status": "Published"},
		fields=ASSET_LIST_FIELDS, order_by="publication_date desc", ignore_permissions=True,
	)
	collection["resources"] = _attach_resource_types(_attach_authors_and_languages(resources))
	return collection


# Kept in sync with the `resource_type` Select options on the `Resources` child doctype.
RESOURCE_TYPE_OPTIONS = [
	"Audio", "Video", "Image", "Letter", "Article",
	"Document", "Presentation", "Statistics", "Speech", "Good Practice",
]

# Kept in sync with the `category` Select options on Repository Resource.
CATEGORY_OPTIONS = [
	"History & Heritage", "Salesian Family", "Formation", "Youth Ministry",
]


@frappe.whitelist(allow_guest=True)
def list_resource_types():
	return [{"name": t, "resource_type_name": t} for t in RESOURCE_TYPE_OPTIONS]


@frappe.whitelist(allow_guest=True)
def list_categories():
	return [{"name": c, "category_name": c} for c in CATEGORY_OPTIONS]
