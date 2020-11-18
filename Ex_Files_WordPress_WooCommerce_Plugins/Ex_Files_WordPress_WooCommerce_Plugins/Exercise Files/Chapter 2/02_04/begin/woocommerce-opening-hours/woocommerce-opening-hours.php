<?php
/*
Plugin Name: WooCommerce Opening Hours
Plugin URI:  http://speakinginbytes.com
Description: Control when your WooCommerce store is open
Version:     1.0
Author:      Patrick Rauland
Author URI:  http://speakinginbytes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: woocommerce-example-plugin
Domain Path: /languages
*/

// Check to make sure WooCommerce is active
if ( in_array( 'woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // only run if there's no other class with this name
    if ( ! class_exists('WC_Opening_Hours')){
        class WC_Opening_Hours{
            public function __construct(){
                add_filter('woocommerce_settings_tabs_array', array( $this, 'add_settings_tab'), 50);
            }

        // add a settings tab
        public function add_settings_tab($settings_tabs){
            $settings_tabs['opening-hours'] = __('Opening Hours', 'woocommerce-opening-hours');
            return $settings_tabs;
        }

        }
        $GLOBALS['wc_opening_hours'] = new WC_Opening_Hours();
    }
}
