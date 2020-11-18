<?php

/*
 * Plugin Name: My Plugin
 * Author: Carrie Dils
 * Text Domain: my-plugin
 */

$path = dirname( plugin_basename( __FILE__ ) ) . '/languages';
load_plugin_textdomain( 'my-plugin', false, $path );