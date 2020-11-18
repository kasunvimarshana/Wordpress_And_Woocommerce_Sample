// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOTURL = "[Insert WordPress site URI]";
const RESTROOT = ROOTURL + '/wp-json';
const RESTROUTE = RESTROOT + '/wp/v2/tasks/';

var jso = new JSO({
	providerID: "[Insert provider ID]",
	client_id: "[Insert client ID]",
	redirect_uri: "[Insert redirect URI]",
	authorization: ROOTURL + "/oauth/authorize"
});

// Catch the response after login:
jso.callback();

var token = localStorage.getItem('tokens-Taskbook');


// Trigger OAuth 2 authentication sequence:
function oauthLogin() {

	jso.getToken();

}

// Log out and wipe all memory of the session:
function oauthLogout() {
	jso.wipeTokens();
}

// Monitor the login button:
$('#login').click(function() {
    oauthLogin();
});

// Monitor the logout button:
$('#logout').click(function() {
    oauthLogout();
	window.location.href = "/";
});

(function() {
	// If we are on the home page, redirect to tasklist.html:
	if ( location.pathname == "/" ) {
		// If we have a token, assume we're logged in:
		if ( token !== null ) {
			window.location.href = "/tasklist.html";
		}

	} else {
		// If we have a token, assume we're logged in:
		if ( token !== null ) {
			// Enable JSO jQuery wrapper:
			JSO.enablejQuery($);
		} else {
			// If we're not logged in, redirect to the login page:
			window.location.href = "/";
		}
	}
})();
