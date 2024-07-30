import { GoogleAuthenticationClient } from "./auth/google_authentication_client.js"
import { EquipmentRecordLoader } from "./loaders/equipment_record_loader.js"

async function main() {
  const authChecker = new GoogleAuthenticationClient()
  const recordLoader = new EquipmentRecordLoader()
  const rowIndex = await recordLoader.loadRecordData()
}

main()