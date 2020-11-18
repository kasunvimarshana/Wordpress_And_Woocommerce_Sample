// Get the current URL and grab the value from the task query parameter:
var urlParams = new URLSearchParams(window.location.search);
const CURRENTID = urlParams.get('task');
console.info('Task ID: ', CURRENTID);

/**
 * Check to see if we have a task ID.
 * If so, get the task in question.
 * If not, redirect back to Task List.
 */
if ( CURRENTID !== null ) {
	let taskRoute = RESTROUTE + CURRENTID;
	console.info('taskRoute: ', taskRoute);
} else {
	window.location.href = "/tasklist.html";
}
