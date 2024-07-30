import { EquipmentDetailsViewModel } from "../data/equipment_details_view_model.js"

export class EquipmentDetailsManager {
  constructor() {
    this.equipmentDetailsElement = document.getElementById("equipment-details")
    this.equipmentIdElement = document.getElementById("equipment-id-display") 
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

    if (this.equipmentIdElement) {
      this.equipmentIdElement.value = viewModel.equipmentId
    }
    if (this.itemTypeElement) {
      this.itemTypeElement.value = viewModel.itemType
    }
    if (this.manufacturerElement) {
      this.manufacturerElement.value = viewModel.make
    }
    if (this.modelNumberElement) {
      this.modelNumberElement.value = viewModel.modelNumber
    }
    if (this.serialNumberElement) {
      this.serialNumberElement.value = viewModel.serialNumber
    }
    if (this.dateAcquiredElement) {
      this.dateAcquiredElement.value = viewModel.dateAcquired
    }
    if (this.dateDisposedElement) {
      this.dateDisposedElement.value = viewModel.dateDisposed
    }
    if (this.inspectionFrequencyElemen) {
      this.inspectionFrequencyElemen.value = viewModel.inspectionFrequency
    }
    if (this.testingNotesElement) {
      this.testingNotesElement.value = viewModel.testingNotes
    }
  }
}