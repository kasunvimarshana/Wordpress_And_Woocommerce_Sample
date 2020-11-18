<?php
/*
Plugin Name:  Angular Plugin
Description:  Our awesome plugin
Version:      1.0.0
Author:       Lynda Author
License:      GPL3
License URI:  https://www.gnu.org/licenses/gpl-3.0.html
Text Domain:  angular-plugin
Domain Path:  /languages
*/

add_action( 'wp_enqueue_scripts', 'angular_plugin_styles_and_scripts' );
function angular_plugin_styles_and_scripts() {

	$script_loc = plugin_dir_url( __FILE__ ) . '/dist/';
	if ( defined( 'WP_ENV' ) && 'LOCAL' === WP_ENV ) {
		$script_loc = '//localhost:4400/';
	}

	$scripts = [
		[
			'key' => 'inline-bundle',
			'script' => 'inline.bundle.js',
		],
		[
			'key' => 'polyfills-bundle',
			'script' => 'polyfills.bundle.js',
		],
		[
			'key' => 'styles-bundle',
			'script' => 'styles.bundle.js',
		],
		[
			'key' => 'vendor-bundle',
			'script' => 'vendor.bundle.js',
		],
		[
			'key' => 'main-bundle',
			'script' => 'main.bundle.js',
		],
	];

	foreach ( $scripts as $key => $value ) {
		$prev_key = ( $key > 0 ) ? $scripts[$key-1]['key'] : 'jquery';
		wp_enqueue_script( $value['key'], $script_loc . $value['script'], array( $prev_key ), '1.0', true );
	}
	wp_localize_script( 'main-bundle', 'api_plugin_settings', array(
		'root' => esc_url_raw( rest_url() ),
		'nonce' => wp_create_nonce( 'wp_rest' )
	) );
}