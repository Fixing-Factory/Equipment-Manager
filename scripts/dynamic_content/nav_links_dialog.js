export class NavLinksDialogManager {
  constructor() {
    this.menuIcon = document.getElementById('menu-icon')
    this.closeButton = document.getElementById('close-dialog')
    this.navigationDialog = document.getElementById('navigation-dialog')
  }

  initialiseDialog() {
    this.menuIcon.addEventListener("click", () => { this.onMenuButtonClick() })
    this.closeButton.addEventListener("click", () => { this.onCloseButtonClick() })
  }

  onMenuButtonClick() {
    if (this.navigationDialog.open) {
      this.navigationDialog.close()
    } else {
      this.navigationDialog.show()
    }
  }

  onCloseButtonClick() {
    this.navigationDialog.close()
  }
}
