import frappe

def create_workspace():
    frappe.init(site="gsdp.com", sites_path="/home/bsoft/slcm-bench-v16/sites")
    frappe.connect()
    
    workspace_name = "GSDP"
    main_module = "Global Salesian Digital Platform"
    
    modules = ["Global Salesian Digital Platform", "Institutional Registry", "Digital Repository"]
    
    if not frappe.db.exists("Workspace", workspace_name):
        doc = frappe.new_doc("Workspace")
        doc.name = workspace_name
    else:
        doc = frappe.get_doc("Workspace", workspace_name)
        doc.shortcuts = [] # clear

    doc.name = workspace_name
    doc.label = workspace_name
    doc.title = workspace_name
    doc.module = main_module
    doc.icon = "globe"
    doc.type = "Workspace"
    doc.public = 1
    
    content = []
    
    shortcut_idx = 0
    for mod in modules:
        doctypes = frappe.get_all("DocType", filters={"module": mod, "istable": 0}, pluck="name")
        if doctypes:
            content.append({"id": f"header_{mod.replace(' ', '')}", "type": "header", "data": {"text": f"<span class=\"h4\">{mod.upper()}</span>", "col": 12}})
            for dt in doctypes:
                content.append({
                    "id": f"shortcut_{shortcut_idx}",
                    "type": "shortcut",
                    "data": {
                        "shortcut_name": dt,
                        "col": 3
                    }
                })
                doc.append("shortcuts", {
                    "type": "DocType",
                    "link_to": dt,
                    "label": dt,
                })
                shortcut_idx += 1
                
    import json
    doc.content = json.dumps(content)
    
    if doc.is_new():
        doc.insert(ignore_permissions=True)
    else:
        doc.save(ignore_permissions=True)
        
    frappe.db.commit()
    
    try:
        from frappe.modules.export_file import export_to_files
        export_to_files(record_list=[["Workspace", workspace_name]], record_module=main_module)
        print(f"Workspace {workspace_name} updated and exported successfully.")
    except Exception as e:
        print(f"Export failed: {e}")

if __name__ == "__main__":
    create_workspace()
