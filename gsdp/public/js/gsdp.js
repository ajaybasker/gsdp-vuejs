// Send Desk users to the public landing page on logout instead of the login page.
frappe.Application.prototype.logout = function () {
	var me = this;
	me.logged_out = true;
	frappe.confirm(__("Are you sure you want to log out?"), function () {
		return frappe.call({
			method: "logout",
			callback: function (r) {
				if (r.exc) {
					return;
				}
				window.location.href = "/gsdp-ui";
			},
		});
	});
};
