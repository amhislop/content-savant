<?php
/**
* @package ContentSavant
*/
require_once plugin_dir_path( dirname( __FILE__ ) ) . "base/savant-controller.php";

class SavantEditor extends SavantController
{

  function register(){
    add_action( 'add_meta_boxes', array( $this, 'savant_add_meta_box' ) );
    add_action( 'save_post', array( $this, 'savant_meta_save' ) );
  }

  /**
   * Add Metaboxes
   * Add savant meta boxes to post types
   * @return null
   */

  function savant_add_meta_box(){

    $savant_screen = get_option('savant_screen');

    add_meta_box(
      'savant_meta',
      'Content Savant',
      array( $this, 'savant_callback_meta' ),
      $savant_screen,
      'advanced',
      'low'
    );

  }

  function savant_callback_meta( $post ){
    wp_nonce_field( basename( __FILE__ ), 'savant_page_nonce' );
    require_once( "$this->plugin_path/templates/savant-metabox.php" );
  }

  function savant_meta_save( $post_id ) {

    $is_autosave = wp_is_post_autosave( $post_id );
    $is_revision = wp_is_post_revision( $post_id );
    $is_valid_nonce = ( isset( $_POST[ 'savant_page_nonce' ] ) && wp_verify_nonce( $_POST[ 'savant_page_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';

    if ( $is_autosave || $is_revision || !$is_valid_nonce ) return;

    $savant_field = $_POST[ 'savant_field' ];
    $savant_meta = get_post_meta($post_id, 'savant_field', true );

    if ( isset( $savant_field ) ) { 
      update_post_meta( $post_id, 'savant_field', $savant_field );
    } elseif( $savant_meta ) {
      delete_post_meta($post_id, 'savant_field');
    }

  }

}
