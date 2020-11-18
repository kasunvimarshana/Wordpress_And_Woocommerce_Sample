<?php
/*
Plugin Name: WooCommerce Example Plugin
Plugin URI:  http://speakinginbytes.com
Description: A wrapper plugin for our custom WooCommerce functionality
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
    if ( ! class_exists('WC_Example')){
        class WC_Example{
            public function __construct(){
                // print an admin notice to the screen
                add_action('admin_notices', array( $this, 'my_admin_notice'));
            }

            //print an admin notice
            public function my_admin_notice(){
                ?>
                    <div class="notice notice-error is-dismissible">
                        <p><?php _e( 'Done!', 'sample-text-domain' ); ?></p>
                    </div>
                <?php
            }
        }
        $GLOBALS['wc_example'] = new WC_Example();
    }
}
