<?php
/*
Plugin Name: WooCommerce Assembly Instructions
Plugin URI:  http://speakinginbytes.com
Description: Add assembly instructions to the product page
Version:     1.0
Author:      Patrick Rauland
Author URI:  http://speakinginbytes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: woocommerce-assembly-instructions
Domain Path: /languages
*/

// Check to make sure WooCommerce is active
if ( in_array( 'woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // only run if there's no other class with this name
    if ( ! class_exists('WC_Assembly_Instructions')){
        class WC_Assembly_Instructions{
            public function __construct(){
                add_filter('woocommerce_product_data_tabs', array($this, 'my_product_data_tab'), 20);
            }

            public function my_product_data_tab( $product_data_tabs ){
                $product_data_tabs[''] = array(
    				'label'  => __( 'Assembly Instructions', 'woocommerce-assembly-instructions' ),
    				'target' => 'assembly_product_data',
    				'class'  => array()
                );

                return $product_data_tabs;
            }

        }
        $GLOBALS['wc_assembly_instructions'] = new WC_Assembly_Instructions();
    }
}
