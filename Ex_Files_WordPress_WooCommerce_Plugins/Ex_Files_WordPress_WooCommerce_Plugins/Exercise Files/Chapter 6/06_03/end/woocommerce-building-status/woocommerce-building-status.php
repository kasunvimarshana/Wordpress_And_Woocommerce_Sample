<?php
/*
Plugin Name: WooCommerce Building Status
Plugin URI:  http://speakinginbytes.com
Description: Add a building status to the available order statuses
Version:     1.0
Author:      Patrick Rauland
Author URI:  http://speakinginbytes.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: woocommerce-building-status
Domain Path: /languages
*/

// Check to make sure WooCommerce is active
if ( in_array( 'woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // only run if there's no other class with this name
    if ( ! class_exists('WC_Building_Status')){
        class WC_Building_Status{
            public function __construct(){
                add_action('init', array($this, 'register_building_order_status'));
                add_filter('wc_order_statuses', array($this, 'add_building_to_order_statuses'));
                add_action('admin_footer', array($this, 'building_order_status_style'));
                add_action('woocommerce_order_status_changed', array($this, 'building_status_message'), 1, 3);
            }

            public function register_building_order_status(){
                register_post_status('wc-building', array(
                    'label'     => 'Building',
                    'public'    => true,
                    'exclude_from_search'   => false,
                    'show_in_admin_all_list'    => true,
                    'show_in_admin_status_list' => true,
                    'label_count'   => _n_noop('Building <span class="count">(%s)</span>','Building <span class="count">(%s)</span>')
                ));
            }

            public function add_building_to_order_statuses( $order_statuses){
                $new_order_statuses = array();

                //add new order status _after_ processing
                foreach($order_statuses as $key => $status){
                    $new_order_statuses[$key] = $status;
                    if ('wc-processing' === $key ) {
                        $new_order_statuses['wc-building'] = 'Building';
                    }
                }
                return $new_order_statuses;
            }

            public function building_order_status_style(){
                ?>
                <style>
                mark.building::after {
                    content: '\e011';
                    color: #CCC;

                    font-family: WooCommerce;
                    speak: none;
                    font-weight: 400;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    -webkit-font-smoothing: antialiased;
                    margin: 0;
                    text-indent: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
                </style>
                <?php
            }

            public function building_status_message( $order_id, $old_status, $new_status ){
                global $woocommerce;

                if( 'building' == $new_status ) {
                    $order = new WC_Order($order_id);

                    // load the mailer
                    $mailer = WC()->mailer();

                    // set subject
                    $subject = 'Your Order is being Built!';
                    $message_body = "Hey there! We're working on your order. It should be build in a week and hten you'll receive and email from us."; 
                    $message = $mailer->wrap_message( $subject, $message_body );

                    // send the message
                    $mailer->send( $order->billing_email, $subject, $message);
                }
            }

        }
        $GLOBALS['wc_building_status'] = new WC_Building_Status();
    }
}
