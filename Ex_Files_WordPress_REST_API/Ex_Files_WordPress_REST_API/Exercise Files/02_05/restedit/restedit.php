<?php
/*
Plugin Name: Front-end editing via the REST API
Description: Extend cookie authentication to the REST API to allow front-end editing.
Version:     0.1
Author:      Morten Rand-Hendriksen
Author URI:  http://lynda.com/mor10
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Domain Path: /languages
Text Domain: restedit
*/

function restedit_scripts() {
	if( !is_admin() && is_single() ) {
		wp_enqueue_script( 'restedit_script', plugin_dir_url(__FILE__) . 'js/restedit.ajax.js', array('jquery'), '0.1', true );
	}
}
add_action( 'wp_enqueue_scripts', 'restedit_scripts' );
