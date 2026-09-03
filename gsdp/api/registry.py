# Public, read-only Institutional Registry endpoints for the gsdp-ui public site.
# All guest-accessible: they intentionally bypass DocType permissions (System Manager only)
# since directory/statistics data is meant to be publicly browsable.
import frappe

PROVINCE_LEVEL_FIELDS = ["name", "province_code", "canonical_name", "city", "country", "region", "total_community"]
COMMUNITY_LEVEL_FIELDS = [
	"name", "canonical_name", "community_type", "province", "region", "generalate", "city", "country",
	"state", "district", "latitude", "longitude", "status", "total_members", "total_activities",
]
ACTIVITY_LEVEL_FIELDS = ["name", "activity_code", "activity_name", "activity_category", "community", "city", "diocese"]
REGION_LEVEL_FIELDS = ["name", "canonical_name", "acronym", "generalate"]

LIST_CONFIG = {
	"Region": {"fields": REGION_LEVEL_FIELDS, "order_by": "canonical_name asc", "parent_field": None},
	"Province": {"fields": PROVINCE_LEVEL_FIELDS, "order_by": "canonical_name asc", "parent_field": "region"},
	"Community": {"fields": COMMUNITY_LEVEL_FIELDS, "order_by": "canonical_name asc", "parent_field": "province"},
	"Activity": {"fields": ACTIVITY_LEVEL_FIELDS, "order_by": "activity_name asc", "parent_field": "community"},
}

SEARCH_FIELDS = {
	"Region": "canonical_name",
	"Province": "canonical_name",
	"Community": "canonical_name",
	"Activity": "activity_name",
}


def _check_doctype(doctype):
	if doctype not in LIST_CONFIG:
		frappe.throw(f"Unsupported doctype: {doctype}")


@frappe.whitelist(allow_guest=True)
def list_countries():
	return frappe.get_all(
		"GSDP Country", fields=["name", "country_name"], order_by="country_name asc", ignore_permissions=True,
	)


@frappe.whitelist(allow_guest=True)
def get_counts():
	return {
		"Generalate": frappe.db.count("Generalate"),
		"Region": frappe.db.count("Region"),
		"Province": frappe.db.count("Province"),
		"Community": frappe.db.count("Community"),
		"Activity": frappe.db.count("Activity"),
	}


@frappe.whitelist(allow_guest=True)
def list_org_units(doctype, parent=None, search=None, limit=200):
	_check_doctype(doctype)
	cfg = LIST_CONFIG[doctype]
	filters = {}
	if parent and cfg["parent_field"]:
		filters[cfg["parent_field"]] = parent
	if search:
		filters[SEARCH_FIELDS[doctype]] = ["like", f"%{search}%"]
	return frappe.get_all(
		doctype, filters=filters, fields=cfg["fields"],
		order_by=cfg["order_by"], limit_page_length=int(limit or 200),
		ignore_permissions=True,
	)


@frappe.whitelist(allow_guest=True)
def get_children(doctype, name):
	_check_doctype(doctype)
	child_map = {"Region": "Province", "Province": "Community", "Community": "Activity"}
	child_doctype = child_map.get(doctype)
	if not child_doctype:
		return []
	return list_org_units(child_doctype, parent=name, limit=1000)


def _breadcrumb(doctype, doc):
	"""Ancestor chain, root-first, for whichever level `doc` sits at."""
	trail = []
	province_name = None

	if doctype == "Activity" and doc.get("community"):
		community = frappe.db.get_value(
			"Community", doc["community"], ["name", "canonical_name", "province"], as_dict=True
		)
		if community:
			trail.append({"doctype": "Community", "name": community.name, "label": community.canonical_name})
			province_name = community.province
	elif doctype == "Community" and doc.get("province"):
		province_name = doc["province"]
	elif doctype == "Province":
		province_name = doc.get("name")

	if province_name:
		province = frappe.db.get_value(
			"Province", province_name, ["name", "canonical_name", "region"], as_dict=True
		)
		if province:
			trail.append({"doctype": "Province", "name": province.name, "label": province.canonical_name})
			if province.region:
				region = frappe.db.get_value("Region", province.region, ["name", "canonical_name"], as_dict=True)
				if region:
					trail.append({"doctype": "Region", "name": region.name, "label": region.canonical_name})

	trail.reverse()
	return trail


@frappe.whitelist(allow_guest=True)
def get_org_unit(doctype, name):
	_check_doctype(doctype)
	if not frappe.db.exists(doctype, name):
		frappe.throw(f"{doctype} {name} not found", frappe.DoesNotExistError)
	doc = frappe.get_doc(doctype, name).as_dict()
	breadcrumb = _breadcrumb(doctype, doc)
	return {"doc": doc, "breadcrumb": breadcrumb}


@frappe.whitelist(allow_guest=True)
def get_sector_counts():
	rows = frappe.db.sql(
		"select activity_category as category, count(name) as count from `tabActivity` "
		"group by activity_category order by count desc",
		as_dict=True,
	)
	for row in rows:
		row["category_label"] = frappe.db.get_value("Activity Category", row["category"], "category_name") or row["category"]
	return rows


@frappe.whitelist(allow_guest=True)
def get_community_counts_by_province():
	return frappe.db.sql(
		"select province, count(name) as count from `tabCommunity` group by province",
		as_dict=True,
	)


@frappe.whitelist(allow_guest=True)
def get_map_points():
	provinces = frappe.get_all("Province", fields=["name", "canonical_name", "region"], ignore_permissions=True)
	points = []
	for province in provinces:
		communities = frappe.get_all(
			"Community", filters={"province": province.name},
			fields=["latitude", "longitude"], ignore_permissions=True,
		)
		count = len(communities)
		if count == 0:
			continue
		located = [c for c in communities if c.latitude and c.longitude]
		if not located:
			continue
		lat = sum(c.latitude for c in located) / len(located)
		lng = sum(c.longitude for c in located) / len(located)
		region_name = None
		if province.region:
			region_name = frappe.db.get_value("Region", province.region, "canonical_name")
		points.append({
			"province_id": province.name,
			"province_name": province.canonical_name,
			"region_name": region_name,
			"latitude": lat,
			"longitude": lng,
			"community_count": count,
		})
	return points


@frappe.whitelist(allow_guest=True)
def list_events(limit=20, province=None, community=None):
	filters = {}
	if province:
		filters["province"] = province
	if community:
		filters["community"] = community
	rows = frappe.get_all(
		"Events", filters=filters,
		fields=["name", "event_code", "event_name", "event_type", "event_date", "venue", "community", "province", "description"],
		order_by="event_date desc", limit_page_length=int(limit or 20), ignore_permissions=True,
	)
	for row in rows:
		if row.community:
			row["community_name"] = frappe.db.get_value("Community", row.community, "canonical_name")
		if row.province:
			row["province_name"] = frappe.db.get_value("Province", row.province, "canonical_name")
	return rows


@frappe.whitelist(allow_guest=True)
def list_activity_categories():
	return frappe.get_all(
		"Activity Category", filters={"status": "Active"},
		fields=["name", "category_name"], order_by="category_name asc", ignore_permissions=True,
	)
