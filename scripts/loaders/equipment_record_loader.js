import { EquipmentDetailsManager } from "../dynamic_content/equipment_details_manager.js"
import { WarningMessageManager } from "../dynamic_content/warning_message_manager.js"
import { SpreadsheetRecordFetcher } from "../spreadsheet_api/spreadsheet_record_fetcher.js"

export class EquipmentRecordLoader {
  constructor() {
    this.equipmentDetailsManager = new EquipmentDetailsManager()
    this.recordFetcher = new SpreadsheetRecordFetcher()
    this.warningMessageManager = new WarningMessageManager()
    this.equipmentDetailsManager = new EquipmentDetailsManager()
  }

  async loadRecordData() {
    const rowdata = await this.loadRecordRow()

    if (rowdata) {
      const [recordRow, rowIndex] = rowdata
      this.equipmentDetailsManager.populateDetails(recordRow)
      this.equipmentDetailsManager.displayDetails()

      // Return the row number in the spreadsheet
      return rowIndex + 1
    }
  }

  async loadRecordRow() {
    const params = new URLSearchParams(location.search.substring(1))
    const recordId = params.get("equipment-id")
    document.getElementById("equipment-id").value = recordId

    if (recordId) {
      const rowData = await this.recordFetcher.loadRecordRow(recordId)
      if (rowData) {
        return rowData
      } else {
        this.warningMessageManager.displayMessage(`Record with id ${recordId} could not be found!`)
      }
    }
  }
}