/**
 * Script for loading the Task list.
 *
 * Constant RESTROUTE and variable token inherited from oauth.js.
 */

function createTaskList(object) {
	$('.task-list').empty().append('<ul></ul>');

	for( let i=0; i<object.length; i++ ) {
		let navListItem =
			'<li>' +
			'<a href="single.html?task=' + object[i].id + '">' +
			'<h2 class="task-title">' + object[i].title.rendered + '</h2>' +
			'<div class="task-date">' +
			'Task created <time datetime="' + object[i].date + '">' + object[i].date + '</time>' +
			'</div>' +
			'<div class="task-status">' + object[i].task_status + '</div>' +
			'</a>' +
			'</li>';

		$('.task-list ul').append(navListItem);
	}
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
