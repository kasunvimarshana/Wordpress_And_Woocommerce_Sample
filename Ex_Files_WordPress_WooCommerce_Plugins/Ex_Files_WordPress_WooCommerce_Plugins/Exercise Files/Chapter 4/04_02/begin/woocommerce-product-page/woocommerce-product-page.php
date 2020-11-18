<?php
/*
Plugin Name: WooCommerce Product Page
Plugin URI:  http://speakinginbytes.com
Description: Customizing the front end of WooCommerce product pages
Version:     1.0
Author:      Patrick Rauland
Author URI:  http://speakinginbytes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: woocommerce-product-pages
Domain Path: /languages
*/

// Check to make sure WooCommerce is active
if ( in_array( 'woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // only run if there's no other class with this name
    if ( ! class_exists('WC_Product_page')){
        class WC_Product_page{
            public function __construct(){
                add_action('init', array( $this, 'change_my_product_page'));
            }

            // move the price beneath the product description
            public function change_my_product_page(){
                remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
                add_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 25);
            }


        }
        $GLOBALS['we_product_page'] = new WC_Product_page();
    }
}
