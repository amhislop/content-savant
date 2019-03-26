<?php
/**
* Trigger file on Plugin uninstall
*
* @package ContentSavant
*/

if( !defined( 'WP_UNINSTALL_PLUGIN' ) ) exit;

// Clear Database stored data
$savant_post_types = get_option('savant_workspace_settings')['post_types'];

$savant_post_fields = array();

// Loop through savant options to get post types with savant_field meta
foreach ( $savant_post_types as $post_type ) {

  $savant_posts = get_posts( array(
    'post_type' => $post_type,
    'meta_key'=> 'savant_field',
    'numberposts' => -1
  ) );

  // loop through each post type to get each post and push them to Array
  foreach( $savant_posts as $savant_post ) {
    array_push( $savant_post_fields, $savant_post->ID );
  }

}

// Loop through post array and delete post meta
foreach( $savant_post_fields as $savant_post_id ) {
  delete_post_meta( $savant_post_id, 'savant_field' );
}

// Delete All Options
delete_option('savant_workspace_settings');
