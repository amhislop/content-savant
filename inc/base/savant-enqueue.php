<?php
/**
* @package ContentSavant
*/
require_once plugin_dir_path( __FILE__ ) . "savant-controller.php";

class SavantEnqueue extends SavantController
{
  public function register(){
      add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue' ) );
  }

  function admin_enqueue() {
    global $pagenow, $typenow;

    $options = get_option('savant_screen');

    if ( is_array( $options ) && in_array( $typenow, $options ) ) {

      wp_enqueue_style( 'savant_admin_css', "$this->plugin_url/assets/css/base.min.css" );

    }

    if ( is_array( $options ) && in_array( $typenow, $options ) && ( $pagenow =='post.php' || $pagenow == 'post-new.php' ) ) {

      // Scripts
      wp_enqueue_script( 'savant_admin_js', "$this->plugin_url/assets/js/build/bundle.js", array('jquery'), '1.0.0', true );

      // WP Media
      wp_enqueue_media();
    }
  }

}
