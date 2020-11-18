<?php

/*
 * Plugin Name: My Plugin
 * Author: Carrie Dils
 * Text Domain: my-plugin
 */

$path = dirname( plugin_basename( __FILE__ ) ) . '/languages';
load_plugin_textdomain( 'my-plugin', false, $path );

// Echo translated string
_e( 'Hello World', 'my-plugin' );

// Echo translated string with context
_ex( 'Lead', 'a leash for a dog', 'my-plugin' );


