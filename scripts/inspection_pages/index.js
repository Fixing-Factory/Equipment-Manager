import { EquipmentRecordLoader } from "../loaders/equipment_record_loader.js"
import { EditFormManager } from "../dynamic_content/edit_form_manager.js"

async function main() {
  const recordLoader = new EquipmentRecordLoader()
  const rowIndex = await recordLoader.loadRecordData()

  if (rowIndex) {
    const editFormManager = new EditFormManager()
    editFormManager.initialiseForms()
  }
}

main()