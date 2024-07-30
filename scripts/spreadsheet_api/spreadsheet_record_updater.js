import { GoogleAuthenticationClient } from "../auth/google_authentication_client.js"
import { AdvisoryInfoDialogManager } from "../dynamic_content/advisory_dialog_manager.js"
import { WarningMessageManager } from "../dynamic_content/warning_message_manager.js"
import { SPREADSHEETCONFIG } from "./spreadsheet_properties.js"
import { SpreadsheetRecordFetcher } from "./spreadsheet_record_fetcher.js"

export class SpreadsheetRecordUpdater {
  constructor() {
    this.googleAuthclient = new GoogleAuthenticationClient()
    this.advisoryDialogManager = new AdvisoryInfoDialogManager()
    this.spreadsheetid = SPREADSHEETCONFIG.spreadsheetId
    this.apiBaseUrl = SPREADSHEETCONFIG.apiBaseUrl
    this.warningMessageManager = new WarningMessageManager()
    this.spreadsheetRecordFetcher = new SpreadsheetRecordFetcher()
  }
  
  async addInspection(inspection) {
    const values = [
      inspection.equipmentId,
      inspection.inspectionDate,
      inspection.inspectorName,
      inspection.plugCheck,
      inspection.flexCheck,
      inspection.bodyCheck,
      inspection.earthResistance,
      inspection.insulationResistance,
      inspection.polarityCheck,
      inspection.functionTest,
      inspection.environmentSuitability,
      inspection.continuedUse,
      inspection.outcome,
      inspection.notes,
    ]
    await this.appendNewRow(SPREADSHEETCONFIG.inspectionSheetName, values, 1, 14)
  }

  async appendNewRow(sheetName, values, rangeStart, rangeEnd) {
    const params = {
      "valueInputOption": "USER_ENTERED",
    }
    const queryParams = new URLSearchParams(params)
    const rowNumber = await this.spreadsheetRecordFetcher.getLastInspectionRowNumber()

    const request = new Request(this.buildSheetUrl(sheetName, rowNumber, rangeStart, rangeEnd, queryParams))
    const accessToken = await this.googleAuthclient.fetchToken()

    await fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        "values": [
          values
        ]
      })
    }).then((response) => {
      if (response.ok) {
        this.advisoryDialogManager.displayTemporarySuccessMessage("Inspection Added!")
        return response.json();
      }
      return Promise.reject(response);
    }).catch(async reason => {
      const responseText = await reason.text()
      this.handleResponseError(responseText)
    })
  }

  buildSheetUrl(sheetName, row, fromColumn, toColumn, urlSearchParams) {
    const spreadsheetRange = `${sheetName}!R${row}C${fromColumn}:R${row}C${toColumn}`
    return `${this.apiBaseUrl}/spreadsheets/${this.spreadsheetid}/values/${spreadsheetRange}?${urlSearchParams.toString()}`
  }

  handleResponseError(text) {
    this.warningMessageManager.displayMessage(`
    Spreadsheet Update Request Failed: ${text}. 
    Requesting new access token...
    `)
    setTimeout(() => this.requestReauth(), 80000)
  }

  requestReauth() {
    localStorage.clear("google-access-token")
    this.googleAuthclient.requestGoogleAuthentication()
  }
}
