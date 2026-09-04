# Public, read-only Digital Repository endpoints for the gsdp-ui public site.
# Only ever returns Repository Resources with status = "Published" — the public-visibility gate.
import frappe

ASSET_LIST_FIELDS = [
	"name", "resource_title", "resource_code", "resource_type", "category", "collection",
	"language", "publication_date", "status", "author",
]


@frappe.whitelist(allow_guest=True)
def list_assets(resource_type=None, category=None, collection=None, search=None, limit=60):
	filters = {"status": "Published"}
	if resource_type:
		filters["resource_type"] = resource_type
	if category:
		filters["category"] = category
	if collection:
		filters["collection"] = collection
	if search:
		filters["resource_title"] = ["like", f"%{search}%"]
	rows = frappe.get_all(
		"Repository Resource", filters=filters, fields=ASSET_LIST_FIELDS,
		order_by="publication_date desc", limit_page_length=int(limit or 60),
		ignore_permissions=True,
	)
	for row in rows:
		if row.author:
			row["author_name"] = frappe.db.get_value("Authorship", row.author, "creator_author")
	return rows


@frappe.whitelist(allow_guest=True)
def get_asset(name):
	if not frappe.db.exists("Repository Resource", name):
		frappe.throw("Resource not found", frappe.DoesNotExistError)
	resource = frappe.get_doc("Repository Resource", name)
	if resource.status != "Published":
		frappe.throw("Resource is not publicly available", frappe.PermissionError)

	resource_dict = resource.as_dict()
	resource_dict["author_detail"] = (
		frappe.get_doc("Authorship", resource.author).as_dict() if resource.author else None
	)
	resource_dict["files"] = frappe.get_all(
		"Resource File", filters={"repository_resource": name},
		fields=["file_name", "file", "media_type", "is_primary", "version"],
		ignore_permissions=True,
	)
	rights = frappe.get_all(
		"Resource Rights", filters={"repository_resource": name},
		fields=["rights_status", "license_type", "rights_description", "access_restriction"],
		limit_page_length=1, ignore_permissions=True,
	)
	resource_dict["rights"] = rights[0] if rights else None

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


@frappe.whitelist(allow_guest=True)
def list_resource_types():
	return frappe.get_all(
		"Resource Type", filters={"is_active": 1},
		fields=["name", "resource_type_name"], order_by="resource_type_name asc", ignore_permissions=True,
	)


@frappe.whitelist(allow_guest=True)
def list_categories():
	return frappe.get_all(
		"Repository Category", filters={"is_active": 1},
		fields=["name", "category_name"], order_by="category_name asc", ignore_permissions=True,
	)
