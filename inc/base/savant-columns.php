<?php
/**
* @package ContentSavant
*/

class SavantColumns
{
  public function register() {

    $options = get_option('savant_workspace_settings')['post_types'];

    if($options == "") $options = array();

    foreach($options as $post_type) {

      add_filter( 'manage_' . $post_type . '_posts_columns', array($this,'add_pages_columns'));
      add_action( 'manage_' . $post_type . '_posts_custom_column' , array($this,'custom_pages_column'), 10, 2 );
      add_filter( 'manage_' . $post_type . '_sortable_columns', array($this, 'sortable_custom_column') );
      add_action( 'pre_get_posts', array($this, 'orderby_custom_columns') );
    }

  }

  public function add_pages_columns( $columns ) {

		$newColumns = array();
		$newColumns['savant'] = '<a href="' . add_query_arg('orderby', 'savant') . '" aria-label="info."><i class="icon code-icon"></i></a>';

		return array_merge($columns, $newColumns);

	}

	public function custom_pages_column( $column_name, $post_id ) {

    if($column_name !== 'savant') return;

    $savant_field = get_post_meta($post_id, 'savant_field', true);

    if($savant_field) echo '<i class="icon check"></i>';
	}

  public function sortable_custom_column( $columns ) {
    $columns['savant'] = 'savant';

    return $columns;
  }

  public function orderby_custom_columns( $query ) {

    $orderby = $query->get( 'orderby' );

    if ( 'savant' == $orderby ) {
      $query->set( 'meta_key', 'savant_field' );
      $query->set( 'orderby', 'meta_value' );
    }
  }

}
