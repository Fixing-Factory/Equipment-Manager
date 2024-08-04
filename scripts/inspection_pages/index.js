import { EquipmentRecordLoader } from "../loaders/equipment_record_loader.js"
import { EditFormManager } from "../dynamic_content/edit_form_manager.js"
import { NavLinksDialogManager } from "../dynamic_content/nav_links_dialog.js";

async function main() {
  const navLinksDialogManager = new NavLinksDialogManager()
  navLinksDialogManager.initialiseDialog()
  const recordLoader = new EquipmentRecordLoader()
  const rowIndex = await recordLoader.loadRecordData()

  if (rowIndex) {
    const editFormManager = new EditFormManager()
    editFormManager.initialiseForms()
  }
}

main()