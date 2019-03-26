<?php
/**
* @package ContentSavant
*/
require_once plugin_dir_path( __FILE__ ) . "savant-controller.php";
require_once plugin_dir_path( __FILE__ ) . "savant-fetch.php";

class SavantAjax extends SavantController
{
  public function register() {
    add_action( 'wp_ajax_savant_get_results', array( $this, 'process_ajax' ) );
    add_action( 'wp_ajax_savant_get_options', array( $this, 'get_options' ) );
    add_action( 'wp_ajax_savant_get_post_types', array( $this, 'get_post_types' ) );
  }

  function get_post_types(){

    $args = array(
      'public' => true,
      'show_ui' => true,
      'show_in_nav_menus' => true,
    );

    $post_types = get_post_types( $args, 'objects' );

    $types = array();
    foreach($post_types as $post_type) {
      array_push($types, array(
        "name" => $post_type->name,
        "label" => $post_type->label
      ));
    }

    echo json_encode($types);
    wp_die();

  }

  // Load in postmeta with Ajax
  // function process_ajax() {

    // $postid = $_POST['postid'];
    // $key = $_POST['key'];
    // $data =  get_post_meta($postid, $key, true);
    // $data =  get_post_meta(2, 'savant_field', true);
  //   $data = new SavantFetch;
  //   echo json_encode($data);

  //   wp_die();
  // }

  function get_options() {
    echo json_encode(get_option('savant_workspace_settings'));
    wp_die();
  }

}
