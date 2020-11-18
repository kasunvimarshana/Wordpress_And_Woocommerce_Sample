(function($){

	const RESTROOT = 'http://restful.dev/wp-json';
	const $ENTRYTITLE = $('.post-title');
	const $LOGIN = $('#loginform');
	const $LOGOUT = $('#logout');

	// Add edit post functionality:
	function editPost() {

	    $ENTRYTITLE.after( '<button class="edit-button edit-title">Edit title</button><button class="edit-title save" style="display: none">Save title</button>' );

	    $('.edit-title.edit-button').click(function(){
	        let $originalTitle = $ENTRYTITLE.text();
	        $ENTRYTITLE.toggle();
	        $ENTRYTITLE.after('<input id="title-input" type="text">');
	        document.querySelector('#title-input').value = $originalTitle;
	        $(this).toggle();
	        $('.edit-title.save').toggle();
	    });

	    $('.save').click(function(){
			let postID = document.querySelector('.post').getAttribute('data-id');
	        let newTitle = document.querySelector('#title-input').value;
	    });

	}
	
	// Get a new token, store it in sessionStorage:
	function getToken(username,password) {

		$.ajax({
			url: RESTROOT + '/jwt-auth/v1/token',
			method: 'POST',
			data:{
				'username': username,
				'password': password
			}
		})

		.done(function(response){
			sessionStorage.setItem('newToken',response.token);
			$LOGIN.toggle();
			$LOGOUT.toggle();
			editPost();
		})

		.fail(function(response){
			console.error("REST error.");
		})
	}

	// Clear token from sessionStorage:
	function clearToken() {
		sessionStorage.removeItem('newToken');
		$LOGIN.toggle();
		$LOGOUT.toggle();
	}



	$LOGIN.toggle();
	$('#login_button').click(function(e){
		e.preventDefault();
		let username = document.querySelector('#user_login').value;
		let password = document.querySelector('#user_pass').value;
		console.info("Username: " + username + " Password: " + password);
		getToken(username,password);
	});

	$('#logout').click(clearToken);

})(jQuery);
