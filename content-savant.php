<?php
/**
 * @package ContentSavant
 */

/**
 * Plugin Name: Content Savant
 * Description: Add Javascript and CSS on a per page basis via a syntax highlighting configurable code editor or file upload.
 * Author: Aidan Hislop
 * Author URI: http://aidanhislop.com
 * Version: 1.1.0
 * License: GPL v3
 */

if ( !defined( 'ABSPATH' ) ) exit;

require_once plugin_dir_path( __FILE__ ) . "inc/content-savant-init.php";

/**
 * Activation Hook
 */
function activate_savant_plugin(){
  require_once plugin_dir_path( __FILE__ ) . "inc/base/savant-activate.php";
  SavantActivate::activate();
}
register_activation_hook( __FILE__, 'activate_savant_plugin' );

/**
 * Deactivation Hook
 */
function deactivate_savant_plugin(){
  require_once plugin_dir_path( __FILE__ ) . "inc/base/savant-deactivate.php";
  SavantDeactivate::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_savant_plugin' );

/**
 * Intialize all the core classes of Content Savant
 */
if ( class_exists( 'ContentSavantInit' ) ) ContentSavantInit::register_Services();
