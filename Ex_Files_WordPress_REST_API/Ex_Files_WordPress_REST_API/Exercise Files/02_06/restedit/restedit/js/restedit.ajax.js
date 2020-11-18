(function($) {

	// Get the entry tile element:
	const $ENTRYTITLE = $('.entry-title');
	// Add an edit button and a save button directly after the entry title.
	// Hide the save button using display:none in an inline style.
    $ENTRYTITLE.after( '<button class="edit-button edit-title">Edit title</button><button class="edit-title save" style="display: none">Save title</button>' );


})(jQuery);
