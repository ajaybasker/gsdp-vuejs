# Public, read-only platform configuration endpoints for the gsdp-ui public site.
import frappe


@frappe.whitelist(allow_guest=True)
def get_login_branding():
	config = frappe.get_single("GSDP Configuration")
	return {
		"login_page_logo": config.login_page_logo or None,
		"login_page_icon": config.login_page_icon or None,
		"login_page_bg_image": config.login_page_bg_image or None,
	}
