# Copyright (c) 2026, Bosco Soft and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class OratoriesandYouthCentres(Document):
	def validate(self):
		if self.year and not (1000 <= self.year <= 9999):
			frappe.throw(_("Year must be a valid 4-digit year (e.g., 2024)"))
