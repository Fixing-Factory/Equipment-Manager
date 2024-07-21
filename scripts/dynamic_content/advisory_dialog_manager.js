export class AdvisoryInfoDialogManager {
  constructor() {
    this.advisoryDialog = document.getElementById('advisory-dialog')
  }

  displayTemporarySuccessMessage(message) {
    this.advisoryDialog.showModal()
    this.advisoryDialog.textContent = message

    setTimeout(() => this.hideDialog(), 2000)
  }

  hideDialog() {
    this.advisoryDialog.close()
  }
}