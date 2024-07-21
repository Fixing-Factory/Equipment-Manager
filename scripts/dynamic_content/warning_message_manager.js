export class WarningMessageManager {
  constructor() {
    this.warningMessageElement = document.getElementById("warning-message")
  }

  displayMessage(message) {
    this.warningMessageElement.className = "enabled"
    this.warningMessageElement.textContent = message
  }
}