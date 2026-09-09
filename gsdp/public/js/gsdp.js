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

// Restrict Province / Community Link fields to the logged-in Province
// Coordinator's / Community Coordinator's own scope when creating or editing
// any document. Server-side permission enforcement (has_permission /
// permission_query_conditions) already blocks out-of-scope records; this
// only narrows what shows up in the dropdown and pre-fills the obvious value.
(function () {
	let scope_promise = null;

	function get_coordinator_scope() {
		if (!scope_promise) {
			scope_promise = frappe
				.call({ method: "gsdp.institutional_registry.permissions.get_my_scope" })
				.then((r) => r.message || { provinces: [], communities: [] });
		}
		return scope_promise;
	}

	frappe.ui.form.on("*", {
		onload: function (frm) {
			const roles = frappe.user_roles || [];
			const is_coordinator =
				roles.includes("Province Coordinator") || roles.includes("Community Coordinator");
			if (!is_coordinator || roles.includes("System Manager")) {
				return;
			}

			get_coordinator_scope().then((scope) => {
				(frm.meta.fields || []).forEach(function (df) {
					if (df.fieldtype !== "Link") {
						return;
					}

					let values = null;
					if (df.options === "Province") {
						values = scope.provinces;
					} else if (df.options === "Community") {
						values = scope.communities;
					}
					if (values === null) {
						return;
					}

					frm.set_query(df.fieldname, function () {
						return { filters: { name: ["in", values.length ? values : [""]] } };
					});

					if (frm.is_new() && values.length === 1 && !frm.doc[df.fieldname]) {
						frm.set_value(df.fieldname, values[0]);
					}
				});
			});
		},
	});
})();
