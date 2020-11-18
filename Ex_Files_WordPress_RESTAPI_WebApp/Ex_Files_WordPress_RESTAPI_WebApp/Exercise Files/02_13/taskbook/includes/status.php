<?php
/**
 * Auto-update the Status field on Save Post.
 *
 * @param into $post_id The post ID.
 * @param post $post The post object.
 * @param bool $update Whether this is an existing post being updated or not.
 */
add_action( 'save_post', 'taskbook_change_status', 10, 3 );

function taskbook_change_status( $post_id, $post, $update ) {

	// Make sure this is a Task. If not, abandon immediately:
	if ( 'task' != get_post_type( $post_id ) ) return;

	// Get the current status of the Outcome meta box:
	if ( isset( $_POST['taskbook_outcome'] ) ) {
		$outcome = $_POST['taskbook_outcome'];
	}

	// If the task has a title (meaning it is not a brand new task),
	// update task_status based on the status of $outcome:
	if ( isset( $_POST['post_title'] ) ) {
		if ( empty( $outcome ) ) {
			update_post_meta( $post_id, 'task_status', false );
		} else {
			update_post_meta( $post_id, 'task_status', true );
		}
	}
}
