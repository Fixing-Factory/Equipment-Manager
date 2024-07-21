import { GoogleAuthenticationClient } from "./auth/google_authentication_client.js"
import { RecordLoader } from "./loaders/record_loader.js"

async function main() {
  const authChecker = new GoogleAuthenticationClient()
  const recordLoader = new RecordLoader()
  const rowIndex = await recordLoader.loadRecordData()
}

main()