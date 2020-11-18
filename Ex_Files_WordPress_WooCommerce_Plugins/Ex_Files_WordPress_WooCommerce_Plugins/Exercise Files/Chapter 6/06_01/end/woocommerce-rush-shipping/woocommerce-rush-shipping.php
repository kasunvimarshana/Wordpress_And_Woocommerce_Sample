<?php
/*
Plugin Name: WooCommerce Rush Shippping
Plugin URI:  http://speakinginbytes.com
Description: Add rush shipping to site
Version:     1.0
Author:      Patrick Rauland
Author URI:  http://speakinginbytes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: woocommerce-rush-shipping
Domain Path: /languages
*/

// Check to make sure WooCommerce is active
if ( in_array( 'woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // only run if there's no other class with this name
    if ( ! class_exists('WC_Rush_Shipping')){
        class WC_Rush_Shipping{
            public function __construct(){
                add_action('woocommerce_flat_rate_shipping_add_rate', array($this, 'rush_shipping'), 10, 2);
            }

            public function rush_shipping($method, $rate){
                $new_rate = $rate;
                $new_rate['id'] .= ':' . 'rush_rate';
                $new_rate['label'] = 'Rush shipping';
                $new_rate['cost'] += $new_rate['cost'];

                $method->add_rate( $new_rate );

            }

        }
        $GLOBALS['wc_rush_shipping'] = new WC_Rush_Shipping();
    }
}
