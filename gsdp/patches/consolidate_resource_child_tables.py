import frappe


def execute():
	"""Move rows from the old Audio Source/Video Source/Image Source child tables
	(and the un-typed rows already in `resources`) into the unified `resources`
	child table on Repository Resource, tagging each row with its resource_type."""
	if not frappe.db.table_exists("Repository Resource"):
		return

	docs = frappe.get_all("Repository Resource", pluck="name")
	for name in docs:
		doc = frappe.get_doc("Repository Resource", name)
		changed = False

		for row in doc.get("audio_source") or []:
			doc.append("resources", {
				"resource_type": "Audio",
				"audio_file": row.audio_file,
				"categories": row.categories,
				"description": row.description,
			})
			changed = True

		for row in doc.get("video_source") or []:
			doc.append("resources", {
				"resource_type": "Video",
				"video": row.video,
				"video_link": row.video_link,
				"date": row.date,
				"categories": row.categories,
				"reference_period": row.reference_period,
				"reference_institution": row.reference_institution,
			})
			changed = True

		for row in doc.get("image_resource") or []:
			doc.append("resources", {
				"resource_type": "Image",
				"image": row.image,
				"location": row.location,
				"year_of_creation": row.year_of_creation,
				"technique": row.technique,
				"description": row.description,
				"reference_period": row.reference_period,
				"reference_institution": row.reference_institution,
				"category": row.category,
			})
			changed = True

		# Existing generic `resources` rows predate the resource_type field on
		# this child table — they were 1:1 with the parent's own resource_type.
		for row in doc.get("resources") or []:
			if not row.resource_type:
				row.resource_type = doc.resource_type
				changed = True

		if changed:
			doc.flags.ignore_mandatory = True
			doc.flags.ignore_validate = True
			doc.save(ignore_permissions=True)

	frappe.db.commit()
