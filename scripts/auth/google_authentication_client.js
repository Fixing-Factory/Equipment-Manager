export class GoogleAuthenticationClient {
  constructor() {
    this.oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
    this.clientId = "575297305808-p3dnopudl1cardivdq3mjspp09sl9st0.apps.googleusercontent.com"
  }

  async fetchTokenForAnonymousAccess() {
    const localAccessToken =  localStorage.getItem("google-access-token")

    if (!localAccessToken) {
      this.requestGoogleAuthentication()
    }
    return localAccessToken
  }

  checkUrlForToken() {
    // Google returns the access token from the fragment part of the URL (along with other values)
    // We unpack it into a dictionary using URLSearchParams and extract the value we need
    const params = new URLSearchParams(location.hash.substring(1))
    const accessToken = params.get("access_token")

    if (accessToken) {
      localStorage.setItem("google-access-token", accessToken)
      return accessToken
    }
  }

  buildRedirectUri() {
    let pathName = location.pathname
    
    if (pathName.endsWith(".html")) {
      const endFileNameStart = location.pathname.lastIndexOf("/")
      pathName = pathName.substring(0, endFileNameStart)
    }

    if (pathName[pathName.length - 1] !== "/"){
      pathName += "/"
    }

    return `${location.origin}${pathName}authcallback.html`
  }

  async requestGoogleAuthentication() {
    const queryparams = new URLSearchParams(location.search.substring(1))
    const recordId = queryparams.get("record-id")
    recordId && localStorage.setItem("previous-record-id", recordId)
    const page = location.pathname
    localStorage.setItem("previous-page", page)

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET')
    form.setAttribute('action', this.oauth2Endpoint)

    // Parameters to pass to OAuth 2.0 endpoint.
    var formParams = {
      'client_id': this.clientId,
      'redirect_uri': this.buildRedirectUri(),
      'scope': "https://www.googleapis.com/auth/spreadsheets",
      'response_type': 'token'
    }

    // Add form parameters as hidden input values.
    for (var p in formParams) {
      var input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', formParams[p])
      form.appendChild(input)
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form)
    form.submit()
  }
}
