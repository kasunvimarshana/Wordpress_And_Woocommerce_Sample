// Get the current URL and grab the value from the task query parameter:
var urlParams = new URLSearchParams(window.location.search);
const CURRENTID = urlParams.get('task');
console.info('Task ID: ', CURRENTID);

/**
 * Display human readable dates:
 * For in-progress taks, show just published date,
 * for completed tasks, show both published and modified dates.
 */
function getDate(object) {

    var options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    var taskDate = new Date(object.date);
    var date =
        '<div class="task-date">' +
        'Task created ' +
        '<time>' +
        taskDate.toLocaleDateString("en-us", options) +
        '</time>' +
        '</div>';

    var modifiedDate = new Date(object.modified);
    var modified = '';
    // Set modified only if taskDate and modifiedDate are different:
    if ( object.date != object.modified ) {
        modified =
            '<div class="task-date">' +
            'Task updated ' +
            '<time>' +
            modifiedDate.toLocaleDateString("en-us", options) +
            '</time>' +
            '</div>';
    }

    return date + modified;
}

/**
 * Build the Task HTML based on REST data.
 */
function createTask(object) {

    $('.single-task').empty().append( '<article class="task"></article>' );

    var task =
        '<h2 class="task-title">' +
        object.title.rendered +
        '</h2>' +
        '<div class="task-meta">' +
        getDate(object) +
        '</div>' +
        '<div class="task-description task-block">' +
        object.content.rendered +
        '</div>' +
        '<div class="task-prediction">' +
        '<h3 class="task-sub">' +
        'Task Prediction' +
        '</h3>' +
        '<div class="task-block">' +
        object.cmb2.taskbook_metabox.taskbook_prediction +
        '</div>' +
        '<h3 class="task-sub">' +
        'Pre-task stress level' +
        '</h3>' +
        '<div class="task-pre-level level">' +
        object.cmb2.taskbook_metabox.taskbook_pre_level +
        '</div>' +
        '</div><!-- .task-prediction -->';

    $('.single-task article').append(task);
}

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
		createTask(object)
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
