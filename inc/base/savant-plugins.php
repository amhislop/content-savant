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

      // <script async src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.15.0/babel.min.js"></script>
      // <script async src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.13.0/polyfill.min.js"></script>

      wp_enqueue_script('babel', 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.15.0/babel.min.js');
      wp_enqueue_script('polyfill', 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.13.0/polyfill.min.js');
    }

  }

}
