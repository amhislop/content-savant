<?php
/**
 * @package ContentSavant
 */

class SavantActivate
{
  public static function activate(){
    flush_rewrite_rules();

    // Setup all options
    if( !get_option( 'savant_workspace_settings' ) ) {

      // Set up default post types
      $args = array(
        'public' => true,
        'show_ui' => true,
        'show_in_nav_menus' => true,
      );

      $post_types = array();

      foreach( get_post_types( $args, 'names' ) as $post_type ) array_push( $post_types, $post_type );

      // Set up default Boilerplate
      $boilerplate = array(
        'css' => "/* Enter some CSS to get Started */",
        'javascript' => "(function($) {\n  // Start entering your code\n})(jQuery)",
      );

      $default_settings = array(
        'boilerplate' => $boilerplate,
        'theme' => 'vscode-dark',
        'babel' => 1,
        'post_types' => $post_types
      );

      update_option( 'savant_workspace_settings', $default_settings );


    }
  }

}
