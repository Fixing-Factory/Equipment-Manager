import { GoogleAuthenticationClient } from "../auth/google_authentication_client.js"
import { SPREADSHEETCONFIG } from "./spreadsheet_properties.js"

export class SpreadsheetRecordFetcher {
  constructor() {
    this.googleAuthclient = new GoogleAuthenticationClient()
    this.apiBaseUrl = SPREADSHEETCONFIG.apiBaseUrl
    this.idColumnNumber = 1
  }

  async loadRecordRow(recordId) {
    const inventoryRows = await this.fetchSpreadsheetRows(SPREADSHEETCONFIG.spreadsheetId, SPREADSHEETCONFIG.inventorySheetName)
    const inventoryRow = this.findRecordbyId(recordId, inventoryRows, SPREADSHEETCONFIG.regisRoadSheetName)
    if (inventoryRow) {
      return inventoryRow
    }
  }

  async fetchSpreadsheetRows(spreadsheetId, sheetName) {
    const request = new Request(this.buildSheetUrl(spreadsheetId, sheetName))
    const accessToken = await this.googleAuthclient.fetchTokenForAnonymousAccess()

    request.headers.set("Authorization", `Bearer ${accessToken}`)

    const response = await fetch(request).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response); 
    }).catch((reason) => { 
      console.log(`
      Spreadsheet Read Request Failed: ${reason}. 
      Requesting new access token...
      `); 
      localStorage.clear("google-access-token")
      this.googleAuthclient.requestGoogleAuthentication() 
    })

    return response.values
  }

  findRecordbyId(recordId, rows, sheetName) {
    const targetRowIndex = rows.findIndex((row) => row[this.idColumnNumber - 1] === recordId);

    if (targetRowIndex !== -1) {
      const targetRow = rows[targetRowIndex]

      return [targetRow, targetRowIndex, sheetName]
    } 
  }

  buildSheetUrl(spreadsheetId, sheetName) {
    return `${this.apiBaseUrl}/spreadsheets/${spreadsheetId}/values/${sheetName}`
  }
}