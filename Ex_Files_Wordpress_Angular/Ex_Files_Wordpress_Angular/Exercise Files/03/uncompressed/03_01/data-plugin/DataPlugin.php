<?php
/*
Plugin Name:  Data Plugin
Description:  Data Plugin
Version:      1.0.0
Author:       Lynda Author
License:      GPL3
License URI:  https://www.gnu.org/licenses/gpl-3.0.html
Text Domain:  data-plugin
Domain Path:  /languages
*/

namespace DataPlugin;
require_once 'vendor/autoload.php';

use DataPlugin\DataModels;
use DataPlugin\DataScripts;

use \WAR\Api as WAR_Api;

class DataPlugin {
	public $config_options;

	public function __construct(){
		new DataScripts();
		$this->config_options = [
			'api_name'              => 'data',
			'version'               => '1',
			'enable_cors'           => true,
			'default_model_params'  => [
				'id',
			],
			'isolate_user_data'     => false
		];

		add_filter( 'the_content', [ $this, 'add_content_id'], 99, 1 );
	}

	public function api_init(){
		$sky_modals = new DataModels();
		$war_api = new War_Api;
		$war_api->add_config( $this->config_options );
		$war_api->add_models( $sky_modals->register() );
		$war_api->init();
	}

	public function add_content_id( $content ) {
		global $post;
		if ( is_single() && $post->ID ) {
			$content = '<span id="dataPluginID" data-id="' . $post->ID . '"></span>' . $content;
		}
		return $content;
	}

}

add_action( 'plugins_loaded', [ new DataPlugin, 'api_init' ] );
