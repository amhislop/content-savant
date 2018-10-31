<?php
/**
* @package ContentSavant
*/

class SavantRender
{

  public function register(){
    add_action( 'wp_head', array( $this, 'enqueue_editor_styles' ) );
    add_action( 'wp_footer', array( $this, 'enqueue_editor_scripts' ) );
    add_action( 'wp_enqueue_scripts', array($this, 'enqueue_files'));
  }

  function enqueue_editor_styles(){
    $this->prepare_user_code( 'savant_field', 'style', 'css' );
  }

  function enqueue_editor_scripts(){
    $this->prepare_user_code( 'savant_field', 'script', 'javascript' );
  }

  function enqueue_files(){
    $this->prepare_user_files( 'savant_field' );
  }

  function prepare_user_files( $key ) {
    if ( !is_singular() ) return;

    wp_reset_postdata();

		$post = get_post();

    if ( is_a( $post, 'WP_Post' ) ) {

      $outputs = get_post_meta( $post->ID, $key, true );

      if( !$outputs ) return;

    	foreach ( $outputs as $output ) {

        if( $output['type'] == 'file' ) {

          if( $output['language'] === 'css' ) {

            wp_enqueue_style( "savant_file_id" . $output['id'] . "lang" . $output['language'], $output['file'] );

          } elseif( $output['language'] === 'javascript' ) {

            wp_enqueue_script( "savant_file_id" . $output['id'] . "lang" . $output['language'], $output['file'] );
          }

        }

      }

    }

  }

  function prepare_user_code($key, $tag, $language){

    if ( is_singular() ) {

      wp_reset_postdata();

  		$post = get_post();

      if ( is_a( $post, 'WP_Post' ) ) {

        // Filter out comments, tabs and line breaks
        $pattern = '/(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))|(\B\s)/';

        $outputs = get_post_meta( $post->ID, $key, true );

        if(!$outputs) return;

      	foreach ( $outputs as $output ) {

          if($output['language'] == $language && $output['type'] !== 'file') {

            $output = $output['code'];

            if( get_option('savant_editor_minify') ) $output = preg_replace($pattern, '', $output);

            echo "<". $tag ." type=text/". $language .">". $output . "</". $tag . ">";

          }

        }

      }
    }
  }


}
