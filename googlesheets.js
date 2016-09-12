// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '75320810784-mf8efpsm96lomo62e49q585rfbo59vaq.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  var discoveryUrl =
      'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(listMajors);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1k__xPoF0WYbZ5A9o91xZtAqZcmGQQ-wGLPFIwd2qOWQ',
    range: 'Students!A1:F',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        console.log(range.values[i]);
      }
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}
