<?php
/**
* @package ContentSavant
*/

require_once plugin_dir_path( dirname( __FILE__ ) ) . "base/savant-controller.php";

class SavantSettings extends SavantController
{

  function register() {

    add_action( 'admin_init', array( $this, 'savant_custom_settings' ) );
    add_action( 'admin_menu', array( $this, 'add_config' ) );

    add_filter( "plugin_action_links_$this->plugin", array( $this, 'settings_link' ) );

  }

  public function add_config() {
      add_submenu_page( 'options-general.php', 'Savant Settings', 'Savant Settings', 'manage_options', 'savant_settings', array( $this, 'settings_callback' ) );
  }

  function settings_callback() {
    require_once( "$this->plugin_path/templates/savant-settings.php" );
  }

  function savant_custom_settings() {

    // Register Setting
    register_setting('savant-settings-group', 'savant_workspace_settings');

    // Add Settings Sections
    add_settings_section( 'savant-sidebar-options', 'Content Savant Settins', array( $this, 'savant_sidebar_options' ), 'savant_settings' ); 
  }

  function savant_sidebar_options() {
    echo "Content Savant Customisation Options";
  }

  public function settings_link($links) {
    $settings_link = '<a href="admin.php?page=savant_settings">Settings</a>';
    array_push( $links, $settings_link );
    return $links;
  }

}
