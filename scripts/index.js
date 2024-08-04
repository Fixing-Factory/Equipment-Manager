import { GoogleAuthenticationClient } from "./auth/google_authentication_client.js"
import { EquipmentRecordLoader } from "./loaders/equipment_record_loader.js"
import { NavLinksDialogManager } from "./dynamic_content/nav_links_dialog.js";

async function main() {
  const navLinksDialogManager = new NavLinksDialogManager()
  navLinksDialogManager.initialiseDialog()
  const authChecker = new GoogleAuthenticationClient()
  const recordLoader = new EquipmentRecordLoader()
  const rowIndex = await recordLoader.loadRecordData()
}

main()