<?php

/**
 * Theme customizations
 *
 * @package      Scratch
 * @author       Carrie Dils
 * @link         http://www.carriedils.com/
 * @copyright    Copyright (c) 2015, Carrie Dils
 * @license      GPL-2.0+
 */

// Load child theme textdomain.
load_child_theme_textdomain( 'scratch' );

add_action( 'genesis_setup', 'scratch_setup' );
/**
 * Theme setup.
 *
 * Attach all of the site-wide functions to the correct hooks and filters. All
 * the functions themselves are defined below this setup function.
 *
 * @since 1.0.0
 */
function scratch_setup() {

}