<?php
/**
 * @package ContentSavant
 */

class SavantActivate
{
  public static function activate(){
    flush_rewrite_rules();

    // Set up default post types
    if( !get_option( 'savant_screen' ) ) {

      $args = array(
        'public' => true,
        'show_ui' => true,
        'show_in_nav_menus' => true,
      );

      $post_types = array();

      foreach( get_post_types( $args, 'names' ) as $post_type ) array_push( $post_types, $post_type );

      update_option( 'savant_screen', $post_types );
    }

    // Set up default Boilerplate
    if( !get_option( 'savant_editor_boilerplate' ) ) {

    $boilerplate = array(
      'css' => "/* Enter some CSS to get Started */",
      'javascript' => "(function($) {\n  // Start entering your code\n})(jQuery)",
    );

    update_option( 'savant_editor_boilerplate', $boilerplate );
    }

    // Setup add on presets
    if( !get_option( 'savant_editor_mode' ) ) update_option( 'savant_editor_mode', array( 'javascript' => 'enhancedJS', 'css' => 'css', );
    if( !get_option( 'savant_editor_theme' ) ) update_option( 'savant_editor_theme', 'vscode-dark' );
    if( !get_option( 'savant_editor_minify' ) ) update_option( 'savant_editor_minify', 1 );
  }

}
