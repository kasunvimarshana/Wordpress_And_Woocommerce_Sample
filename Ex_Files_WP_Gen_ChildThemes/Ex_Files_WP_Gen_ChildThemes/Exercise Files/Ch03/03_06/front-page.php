<?php

/**
 * Front page template
 *
 * @package      Scratch
 * @author       Carrie Dils
 * @link         http://www.carriedils.com/
 * @copyright    Copyright (c) 2015, Carrie Dils
 * @license      GPL-2.0+
 */

function scratch_home_page_setup() {

	$home_sidebars = array(
		'home_welcome' 	   => is_active_sidebar( 'home-welcome' ),
		'call_to_action'   => is_active_sidebar( 'call-to-action' ),
	);

	// Return early if no sidebars are active.
	if ( ! in_array( true, $home_sidebars ) ) {
		return;
	}

	// Add home welcome area if "Home Welcome" widget area is active.
	if ( $home_sidebars['home_welcome'] ) {
		//
	}
	// Add call to action area if "Call to Action" widget area is active.
	if ( $home_sidebars['call_to_action'] ) {
		//
	}

}

genesis();
