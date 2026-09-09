"""Global row-level permissions for Province / Community Coordinators.

Province Coordinator: set via Province.province_coordinator_name. Can view
their own Province, every Community under that Province, and any record of
ANY doctype in the app that carries a Link field to Province (directly) or
to Community (resolved through the Province's communities).

Community Coordinator: set via Community.community_coordinator. Can view
only their own Community, and any record of ANY doctype in the app that
carries a Link field to Community, scoped to their own Community.

Wired as a wildcard ("*") entry in hooks.py so it automatically covers every
doctype in the project - existing ones and any created in the future -
without needing per-doctype hook registration.
"""

import frappe

COORDINATOR_ROLES = {"Province Coordinator", "Community Coordinator"}


def _coordinated_provinces(user):
	return frappe.get_all("Province", filters={"province_coordinator_name": user}, pluck="name")


def _coordinated_communities(user):
	return frappe.get_all("Community", filters={"community_coordinator": user}, pluck="name")


def _communities_under_provinces(provinces):
	if not provinces:
		return []
	return frappe.get_all("Community", filters={"province": ["in", provinces]}, pluck="name")


def _provinces_of_coordinated_communities(user):
	communities = _coordinated_communities(user)
	if not communities:
		return []
	return frappe.get_all("Community", filters={"name": ["in", communities]}, pluck="province")


def _province_community_fields(doctype):
	"""Auto-detect the Link-to-Province / Link-to-Community fieldnames on a doctype."""
	cache = frappe.cache()
	cache_key = f"gsdp_province_community_fields::{doctype}"
	cached = cache.get_value(cache_key)
	if cached is not None:
		return cached

	fields = {}
	try:
		meta = frappe.get_meta(doctype)
	except Exception:
		cache.set_value(cache_key, fields)
		return fields

	for df in meta.fields:
		if df.fieldtype != "Link":
			continue
		if df.options == "Province" and "province" not in fields:
			fields["province"] = df.fieldname
		elif df.options == "Community" and "community" not in fields:
			fields["community"] = df.fieldname

	cache.set_value(cache_key, fields)
	return fields


# ---------------------------------------------------------------------------
# Province doctype (self: scoped by province_coordinator_name)
# ---------------------------------------------------------------------------


def _province_query_conditions(user, roles):
	conditions = []
	if "Province Coordinator" in roles:
		conditions.append(f"`tabProvince`.`province_coordinator_name` = {frappe.db.escape(user)}")
	if "Community Coordinator" in roles:
		provinces = _provinces_of_coordinated_communities(user)
		if provinces:
			escaped = ", ".join(frappe.db.escape(p) for p in provinces)
			conditions.append(f"`tabProvince`.`name` in ({escaped})")
		else:
			conditions.append("1=0")
	return conditions


def _has_province_permission(doc, user, roles):
	allowed = False
	if "Province Coordinator" in roles and doc.province_coordinator_name == user:
		allowed = True
	if "Community Coordinator" in roles and doc.name in _provinces_of_coordinated_communities(user):
		allowed = True
	return allowed


# ---------------------------------------------------------------------------
# Community doctype (self: scoped by community_coordinator, or by parent province)
# ---------------------------------------------------------------------------


def _community_query_conditions(user, roles):
	conditions = []
	if "Community Coordinator" in roles:
		conditions.append(f"`tabCommunity`.`community_coordinator` = {frappe.db.escape(user)}")
	if "Province Coordinator" in roles:
		provinces = _coordinated_provinces(user)
		if provinces:
			escaped = ", ".join(frappe.db.escape(p) for p in provinces)
			conditions.append(f"`tabCommunity`.`province` in ({escaped})")
		else:
			conditions.append("1=0")
	return conditions


def _has_community_permission(doc, user, roles):
	allowed = False
	if "Community Coordinator" in roles and doc.community_coordinator == user:
		allowed = True
	if "Province Coordinator" in roles and doc.province in _coordinated_provinces(user):
		allowed = True
	return allowed


# ---------------------------------------------------------------------------
# Every other doctype: auto-detected via its Province / Community Link fields
# ---------------------------------------------------------------------------


def _generic_query_conditions(doctype, user, roles):
	fields = _province_community_fields(doctype)
	if not fields:
		return []

	table = f"`tab{doctype}`"
	conditions = []

	if "Community Coordinator" in roles:
		if "community" in fields:
			communities = _coordinated_communities(user)
			if communities:
				escaped = ", ".join(frappe.db.escape(c) for c in communities)
				conditions.append(f"{table}.`{fields['community']}` in ({escaped})")
			else:
				conditions.append("1=0")
		else:
			conditions.append("1=0")

	if "Province Coordinator" in roles:
		provinces = _coordinated_provinces(user)
		if "province" in fields:
			if provinces:
				escaped = ", ".join(frappe.db.escape(p) for p in provinces)
				conditions.append(f"{table}.`{fields['province']}` in ({escaped})")
			else:
				conditions.append("1=0")
		elif "community" in fields:
			communities = _communities_under_provinces(provinces)
			if communities:
				escaped = ", ".join(frappe.db.escape(c) for c in communities)
				conditions.append(f"{table}.`{fields['community']}` in ({escaped})")
			else:
				conditions.append("1=0")
		else:
			conditions.append("1=0")

	return conditions


def _has_generic_permission(doc, user, roles):
	fields = _province_community_fields(doc.doctype)
	if not fields:
		return True

	allowed = False
	if "Community Coordinator" in roles:
		if "community" in fields and doc.get(fields["community"]) in _coordinated_communities(user):
			allowed = True

	if "Province Coordinator" in roles:
		provinces = _coordinated_provinces(user)
		if "province" in fields:
			if doc.get(fields["province"]) in provinces:
				allowed = True
		elif "community" in fields:
			if doc.get(fields["community"]) in _communities_under_provinces(provinces):
				allowed = True

	return allowed


# ---------------------------------------------------------------------------
# Public entry points - registered as "*" in hooks.py
# ---------------------------------------------------------------------------


def get_scoped_permission_query_conditions(user, doctype=None):
	user = user or frappe.session.user
	roles = frappe.get_roles(user)

	if "System Manager" in roles or not (COORDINATOR_ROLES & set(roles)):
		return ""

	if doctype == "Province":
		conditions = _province_query_conditions(user, roles)
	elif doctype == "Community":
		conditions = _community_query_conditions(user, roles)
	else:
		conditions = _generic_query_conditions(doctype, user, roles)

	return "(" + " or ".join(conditions) + ")" if conditions else ""


def has_scoped_permission(doc, user=None, permission_type=None):
	user = user or frappe.session.user
	roles = frappe.get_roles(user)

	if "System Manager" in roles or not (COORDINATOR_ROLES & set(roles)):
		return True

	if doc.doctype == "Province":
		return _has_province_permission(doc, user, roles)
	if doc.doctype == "Community":
		return _has_community_permission(doc, user, roles)
	return _has_generic_permission(doc, user, roles)


@frappe.whitelist()
def get_my_scope():
	"""Provinces / Communities the current user coordinates.

	Used by the client-side form scripts to restrict the Province / Community
	Link fields to the coordinator's own scope when creating records.
	"""
	user = frappe.session.user
	roles = frappe.get_roles(user)

	provinces = _coordinated_provinces(user) if "Province Coordinator" in roles else []
	communities = _coordinated_communities(user) if "Community Coordinator" in roles else []

	return {"provinces": provinces, "communities": communities}
