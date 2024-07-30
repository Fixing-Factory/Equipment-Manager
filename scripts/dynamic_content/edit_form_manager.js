import { Inspection } from "../data/inspection.js";
import { SpreadsheetRecordUpdater } from "../spreadsheet_api/spreadsheet_record_updater.js";

export class EditFormManager {
  constructor() {
    this.inspectionForm = document.getElementById("inspection-form")
    this.inpsectionFormsContainer = document.getElementById("inspection-forms")

    this.spreadsheetRecordUpdater = new SpreadsheetRecordUpdater()
  }

  initialiseForms() {
    this.inpsectionFormsContainer.className = "enabled"
    this.inspectionForm.addEventListener('submit', (event) => this.formSubmit(event))
    this.inspectionForm.addEventListener('formdata', (event) => this.processInspectionFormData(event))
  }

  processInspectionFormData(event) {
    const data = event.formData;

    const equipmentId = document.getElementById("equipment-id").value
    const inspectionDate = data.get("inspection-date")
    const inspectorName = data.get("inspector-name")
    const plugCheck = data.get("plug-inspected")
    const flexCheck = data.get("flex-inspected")
    const bodyCheck = data.get("body-inspected")
    const earthResistance = data.get("earth-resistance")
    const insulationResistance = data.get("insulation-resistance")
    const polarityCheck = data.get("polarity-test")
    const functionTest = data.get("function-test")
    const environmentSuitability = data.get("environment-suitability")
    const continuedUse = data.get("continued-use-suitability")
    const outcome = data.get("outcome")
    const notes = data.get("notes")

    const inspection = new Inspection(
      equipmentId,
      inspectionDate,
      inspectorName,
      plugCheck,
      flexCheck,
      bodyCheck,
      earthResistance,
      insulationResistance,
      polarityCheck,
      functionTest,
      environmentSuitability,
      continuedUse,
      outcome,
      notes
    )

    this.spreadsheetRecordUpdater.addInspection(inspection)
  }

  formSubmit(event) {
    // Implicitly raises a "formdata" event (so we can actually read the data and use it!)
    new FormData(event.target);

    // Suppresses the default form behaviour of directing to a new page on page submit
    event.preventDefault()
  }
}