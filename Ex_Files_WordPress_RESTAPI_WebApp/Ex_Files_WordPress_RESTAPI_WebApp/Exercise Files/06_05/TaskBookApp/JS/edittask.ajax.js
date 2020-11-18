function createTask(formData) {

	jso.ajax({
		dataType: 'json',
		url: RESTROUTE,
		method: 'POST',
		data: formData
	})

	.done(function(object) {
		window.location.href = "/tasklist.html";
	})

	.fail(function() {
		console.error("REST error. Nothing returned for AJAX.");
	})

	.always(function() {

	})
}

function generateJSON() {
	let formData = {
		"status": "private",
		"title": $('input[name=title]').val(),
		"content": $('textarea[name=description]').val(),
		"cmb2": {
					"taskbook_metabox": {
							"taskbook_prediction": $('textarea[name=prediction]').val(),
							"taskbook_pre_level": $('input[name=pre-leve]:checked').val()
					}
		},
		"task_status": false
	};

	createTask(formData);
}

$(document).on('submit', '#task-form', function(event) {
	event.preventDefault();
	generateJSON();
})
