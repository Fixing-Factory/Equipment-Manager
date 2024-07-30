export class Inspection {
  constructor(
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
    notes,
  ) {
    this.equipmentId = equipmentId
    this.inspectionDate = inspectionDate
    this.inspectorName = inspectorName
    this.plugCheck = plugCheck
    this.flexCheck = flexCheck
    this.bodyCheck = bodyCheck
    this.earthResistance = earthResistance
    this.insulationResistance = insulationResistance
    this.polarityCheck = polarityCheck
    this.functionTest = functionTest
    this.environmentSuitability = environmentSuitability
    this.continuedUse = continuedUse
    this.outcome = outcome
    this.notes = notes
  }
} 