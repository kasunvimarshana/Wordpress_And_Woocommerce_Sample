<?php
add_action( 'wp_enqueue_scripts', 'angular_theme_styles_and_scripts' );
function angular_theme_styles_and_scripts() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

	$script_loc = get_template_directory_uri() . '/dist/';
	if ( defined( 'WP_ENV' ) && 'LOCAL' === WP_ENV ) {
		$script_loc = '//localhost:4200/';
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

}

add_action( 'wp_head', 'add_base_href', 99 );
function add_base_href() {
	if ( is_front_page() ) {
		echo '<base href="/">';
	}
}