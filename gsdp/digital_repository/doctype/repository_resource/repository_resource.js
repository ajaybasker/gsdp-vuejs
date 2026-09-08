// Copyright (c) 2026, Bosco Soft and contributors
// For license information, please see license.txt

const RESOURCE_TABLE_FIELDS = ["audio_source", "video_source", "image_resource", "resources"];

const RESOURCE_TYPE_TABLE_MAP = {
	"Audio": "audio_source",
	"Video": "video_source",
	"Image": "image_resource",
	"Letter": "resources",
	"Article": "resources",
	"Document": "resources",
	"Presentation": "resources",
	"Statistics": "resources",
	"Speech": "resources",
	"Good Practice": "resources",
};

function toggle_resource_tables(frm) {
	const active_field = RESOURCE_TYPE_TABLE_MAP[frm.doc.resource_type];
	RESOURCE_TABLE_FIELDS.forEach((fieldname) => {
		frm.toggle_display(fieldname, fieldname === active_field);
	});
}

frappe.ui.form.on("Repository Resource", {
	refresh(frm) {
		toggle_resource_tables(frm);
	},
	resource_type(frm) {
		toggle_resource_tables(frm);
	},
});
