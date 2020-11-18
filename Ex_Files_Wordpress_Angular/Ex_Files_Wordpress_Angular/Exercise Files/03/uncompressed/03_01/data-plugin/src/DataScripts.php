<?php

namespace DataPlugin;


class DataScripts {

	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'data-plugin-js', plugin_dir_url( __DIR__ ) . 'js/data-scripts.js', array( 'jquery' ), null, true );
		wp_localize_script( 'data-plugin-js', 'data_plugin_settings', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' )
		) );
	}
}