/**
 * Script for loading the Task list.
 *
 * Constant RESTROUTE and variable token inherited from oauth.js.
 */

// Pagination count starts at page 2 and moves up.
var pageCount = 1;

/**
 * Display date property for new tasks, modified property for completed tasks.
 * Make displayed dates human readable.
 *
 * Called form within the for loop and applied to individual task objects.
 */

function getDate(object) {

	let date;
	let options = {
		weekday: "long",
		year:    "numeric",
		month:   "short",
		day:     "numeric",
		hour:    "2-digit",
		minute:  "2-digit",
	};

	if ( !object.modified ) {
		let taskDate = new Date(object.date);
		date = 'Task created <time datetime="' + object.date + '">' + taskDate.toLocaleDateString("en-us", options) + '</time>';
	} else {
		let taskModified = new Date(object.modified);
		date = 'Task modified <time datetime="' + object.modified + '">' + taskModified.toLocaleDateString("en-us", options) + '</time>';
	}

	return date;
}

/**
 * Display status messages based on boolean task_status value.
 *
 * Called form within the for loop and applied to individual task objects.
 */
function getStatus(status) {

		let taskStatus;

		if (status) {
			taskStatus = 'Completed';
		} else {
			taskStatus = 'In progress';
		}

		return taskStatus;

}

/**
 * Render HTML output for the task list.
 *
 * Receives raw JSON object from the AJAX REST request.
 */
function createTaskList(object) {

	for( let i=0; i<object.length; i++ ) {
		let navListItem =
			'<li>' +
			'<a href="single.html?task=' + object[i].id + '">' +
			'<h2 class="task-title">' + object[i].title.rendered + '</h2>' +
			'<div class="task-date">' +
			getDate(object[i]) +
			'</div>' +
			'<div class="task-status">' + getStatus(object[i].task_status) + '</div>' +
			'</a>' +
			'</li>';

		$('.task-list ul').append(navListItem);
	}
	$('.main-area').append('<button class="more">Load more tasks</button>');
	morePostsTrigger();

}

/**
 * Run an AJAX REST request with the help of JSO's jQuery wrapper.
 */
function getTaskList(listRoute) {
	// Remove the Load More Tasks button.
	$('.more').remove();
	// Display the spinner as we wait for the response.
	$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: listRoute
	})

	.done(function(object) {
		createTaskList(object);
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
 * Load more posts when we reach the bottom.
 */
function morePostsTrigger() {

	var triggerPosition = $('.more').offset().top - $(window).outerHeight();

	$(window).scroll(function(event) {
		if ( triggerPosition > $(window).scrollTop() ) {
			return;
		}
		// Bump up pageCount:
		pageCount++;
		// Generate new reqest route with pagination:
		listRoute = RESTROUTE + '?page=' + pageCount;
		// Get new tasks for the task list:
		getTaskList(listRoute);
		// Stop the event so we can start over:
		$(this).off(event);

	});

}

/**
 * If the user is authenticated, get the task list,
 * else, jump to the login view.
 */
if ( token !== null ) {
	let listRoute = RESTROUTE;
	getTaskList(listRoute);
} else {
	window.location.href = "/";
}
