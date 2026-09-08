# Public, read-only Digital Repository endpoints for the gsdp-ui public site.
# Only ever returns Repository Resources with status = "Published" — the public-visibility gate.
import difflib

import frappe

ASSET_LIST_FIELDS = [
	"name", "title", "resource_code", "resource_type", "category", "collection",
	"language", "publication_date", "status", "author", "cover_image",
]

# Fields searched for a direct (substring) match, and used as the fuzzy-match haystack
# when no direct match is found (e.g. the user made a typo).
SEARCHABLE_FIELDS = ["title", "author", "description", "category", "resource_type", "resource_code"]

FUZZY_SCORE_THRESHOLD = 0.55


@frappe.whitelist(allow_guest=True)
def list_assets(resource_type=None, category=None, collection=None, search=None, limit=60):
	filters = {"status": "Published"}
	if resource_type:
		filters["resource_type"] = resource_type
	if category:
		filters["category"] = category
	if collection:
		filters["collection"] = collection

	limit = int(limit or 60)
	search = (search or "").strip()

	if not search:
		rows = frappe.get_all(
			"Repository Resource", filters=filters, fields=ASSET_LIST_FIELDS,
			order_by="publication_date desc", limit_page_length=limit,
			ignore_permissions=True,
		)
		return {"results": rows, "fuzzy": False, "query": ""}

	term = f"%{search}%"
	or_filters = [[field, "like", term] for field in SEARCHABLE_FIELDS]
	rows = frappe.get_all(
		"Repository Resource", filters=filters, or_filters=or_filters, fields=ASSET_LIST_FIELDS,
		order_by="publication_date desc", limit_page_length=limit,
		ignore_permissions=True,
	)
	if rows:
		return {"results": rows, "fuzzy": False, "query": search}

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
	return {"results": rows, "fuzzy": True, "query": search}


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
	resource_dict["rights"] = None

	related_filters = {"status": "Published", "category": resource.category, "name": ["!=", name]}
	resource_dict["related"] = frappe.get_all(
		"Repository Resource", filters=related_filters, fields=ASSET_LIST_FIELDS,
		limit_page_length=4, ignore_permissions=True,
	)
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
	collection["resources"] = frappe.get_all(
		"Repository Resource", filters={"collection": name, "status": "Published"},
		fields=ASSET_LIST_FIELDS, order_by="publication_date desc", ignore_permissions=True,
	)
	return collection


# Kept in sync with the `resource_type` Select options on Repository Resource.
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
