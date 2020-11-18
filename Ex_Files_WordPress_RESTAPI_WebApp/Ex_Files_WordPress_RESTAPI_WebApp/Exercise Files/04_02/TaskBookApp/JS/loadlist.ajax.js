/**
 * Script for loading the Task list.
 *
 * Constant RESTROUTE and variable token inherited from oauth.js.
 */

function createTaskList(object) {
	console.info(object);
}

function getTaskList() {

	$(".task-list").append('<div class="loader"><img src="JS/spinner.svg" class="ajax-loader" /></div>');

	jso.ajax({
		dataType: 'json',
		url: RESTROUTE
	})

	.done(function(object) {
		createTaskList(object);
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {
		$('.loader').remove();
	})

}

if ( token !== null ) {
	getTaskList();
} else {
	window.location.href = "/";
}
