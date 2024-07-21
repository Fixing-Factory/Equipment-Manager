import { EquipmentDetailsViewModel } from "../data/equipment_details_view_model.js"

export class EquipmentDetailsManager {
  constructor() {
    this.equipmentDetailsElement = document.getElementById("equipment-details")
    this.equipmentIdElement = document.getElementById("equipment-id")
    this.itemTypeElement = document.getElementById("item-type")
    this.manufacturerElement = document.getElementById("manufacturer")
    this.modelNumberElement = document.getElementById("model-number")
    this.serialNumberElement = document.getElementById("serial-number")
    this.dateAcquiredElement = document.getElementById("date-acquired")
    this.dateDisposedElement = document.getElementById("date-disposed")
    this.inspectionFrequencyElement = document.getElementById("inspection-frequency")
    this.testingNotesElement = document.getElementById("testing-notes")
  }

  displayDetails() {
    this.equipmentDetailsElement.className = "enabled"
  }

  populateDetails(row) {
    const viewModel = new EquipmentDetailsViewModel(row)

    this.equipmentIdElement.value = viewModel.equipmentId
    this.itemTypeElement.value = viewModel.itemType
    this.manufacturerElement.value = viewModel.itemType
    this.modelNumberElement.value = viewModel.modelNumber
    this.serialNumberElement.value = viewModel.serialNumber
    this.dateAcquiredElement.value = viewModel.dateAcquired
    this.dateDisposedElement.value = viewModel.dateDisposed
    this.inspectionFrequencyElement.value = viewModel.inspectionFrequency
    this.testingNotesElement.value = viewModel.testingNotes
  }
}