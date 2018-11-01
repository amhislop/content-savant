<?php
/**
* @package ContentSavant
*/

require_once plugin_dir_path( __FILE__ ) . "savant-controller.php";

class SavantPlugins extends SavantController
{
  public function register(){
      add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue' ) );
  }

  function admin_enqueue() {

    global $pagenow, $typenow;

    $options = get_option('savant_screen');

    if ( is_array( $options ) && in_array( $typenow, $options ) ) {

      wp_enqueue_style('font-awesome', "https://use.fontawesome.com/releases/v5.0.11/css/all.css");
      wp_enqueue_style( 'codemirror_css', "$this->plugin_url/codemirror/lib/codemirror.css" );

    }

  }

}
