export class EquipmentDetailsViewModel {
  constructor(row) {
    this.equipmentId = row[0]
    this.itemType = row[1] || "Missing!"
    this.make = row[2] || "Missing!"
    this.modelNumber = row[3] || "Missing!"
    this.serialNumber = row[4] || "Missing!"
    this.dateAcquired = row[5] || "Missing!"
    this.dateDisposed = row[6] || "Missing!"
    this.inspectionFrequency = row[7] || "Missing!"
    this.testingNotes = row[8] || "Missing!"
  }
}