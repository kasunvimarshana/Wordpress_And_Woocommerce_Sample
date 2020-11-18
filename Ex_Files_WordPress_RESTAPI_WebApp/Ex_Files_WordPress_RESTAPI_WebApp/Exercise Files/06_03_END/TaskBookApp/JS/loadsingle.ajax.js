// Get the current URL and grab the value from the task query parameter:
var urlParams = new URLSearchParams(window.location.search);
const CURRENTID = urlParams.get('task');
console.info('Task ID: ', CURRENTID);

/**
 * Run an AJAX REST request with the help of JSO's jQuery wrapper.
 */
function getTask(taskRoute) {
	// Display the spinner as we wait for the response.
	$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: taskRoute
	})

	.done(function(object) {
		console.info(object);
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {
		// Remove the spinner when response is received.
		$('.loader').remove();
	})

}

/**
 * Check to see if we have a task ID.
 * If so, get the task in question.
 * If not, redirect back to Task List.
 */
if ( CURRENTID !== null ) {
	let taskRoute = RESTROUTE + CURRENTID;
	console.info('taskRoute: ', taskRoute);
	getTask(taskRoute);
} else {
	window.location.href = "/tasklist.html";
}
