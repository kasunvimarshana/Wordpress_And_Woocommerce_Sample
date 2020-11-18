<?php
/**
 * Register Task Logger role.
 */
function taskbook_register_role() {
	add_role( 'task_logger', 'Task Logger' );
}

/**
 * Remove Task Logger role.
 */
function taskbook_remove_role() {
	remove_role( 'task_logger', 'Task Logger' );
}
