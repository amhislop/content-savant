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

    // Master Setting
    register_setting('savant-settings-group', 'savant_workspace_settings');
    

    // Register Settings
    register_setting( 'savant-settings-group', 'savant_screen' );
    register_setting( 'savant-settings-group', 'savant_editor_mode' );
    register_setting( 'savant-settings-group', 'savant_editor_theme' );
    register_setting( 'savant-settings-group', 'savant_editor_minify' );
    register_setting( 'savant-settings-group', 'savant_editor_babelify' );
    register_setting( 'savant-settings-group', 'savant_editor_boilerplate' );

    // Add Settings Sections
    add_settings_section( 'savant-sidebar-options', 'Sidebar Options', array( $this, 'savant_sidebar_options' ), 'savant_settings' );

    // Add Settings Fields
    add_settings_field( 'sidebar-screen', 'Post Types', array( $this, 'savant_sidebar_screen' ), 'savant_settings', 'savant-sidebar-options' );

    add_settings_field( 'editor_mode', 'Editor Mode settings', array( $this, 'savant_editor_mode' ), 'savant_settings', 'savant-sidebar-options' );
    add_settings_field( 'editor_theme', 'Editor Theme settings', array( $this, 'savant_editor_theme' ), 'savant_settings', 'savant-sidebar-options' );

    add_settings_field( 'minify', 'Minify my code', array( $this, 'settings_minify' ), 'savant_settings', 'savant-sidebar-options' );
    add_settings_field( 'babelify', 'Babelify my code', array( $this, 'settings_babelify' ), 'savant_settings', 'savant-sidebar-options' );
    add_settings_field( 'boilerplate', 'Boilerplate Code', array( $this, 'settings_boilerplate' ), 'savant_settings', 'savant-sidebar-options' );
    

    add_settings_field( 'savant-workspace-settings', 'Savant Settings', array( $this, 'savant_workspace_settings_callback' ), 'savant_settings', 'savant-sidebar-options' );  
  }

  function savant_workspace_settings_callback() {
   
  }

  function savant_sidebar_options() {
    echo "Content Savant Customisation Options";
  }

  function savant_sidebar_screen() {

    $args = array(
      'public' => true,
      'show_ui' => true,
      'show_in_nav_menus' => true,
    );

    $post_types = get_post_types( $args, 'objects' );
    $options = get_option('savant_screen');

    if($options == "") $options = array();

    foreach($post_types as $post_type) {

      ( in_array( $post_type->name, $options ) ) ? $checked = ' checked="checked"' : $checked = '';

      echo '<label class="savant-post-types"><input type="checkbox" name="savant_screen[]" value="' . $post_type->name . '"' . $checked . '>'. $post_type->label . '</label>';
    }
  }

  function savant_editor_mode() {
    
    $options = get_option('savant_editor_mode') ? get_option('savant_editor_mode') : null;

    ?>
      <label><strong>Javascript Mode</strong></label>
      <select name="savant_editor_mode[javascript]" id="savant_editor_mode[javascript]">
        <option>--Select a JS mode--</option>
        <option value="javascript" <?php selected( $options['javascript'] === "javascript") ?>>Default Javascript</option>
        <!-- <option value="enhancedJS" <?php //selected( $options['javascript'] === "enhancedJS") ?>>Enhanced Javascript</option> -->
      </select>
      <p class="description">Select from the default Code Mirror JS mode or the Enhanced JS mode for better syntax highlighting.</p>

      <label><strong>CSS Mode</strong></label>
      <select name="savant_editor_mode[css]" id="savant_editor_mode[css]">
        <option>--Select a CSS mode--</option>
        <option value="css" <?php selected( $options['css'] === "css") ?>>Default CSS</option>
      </select>
      <p class="description">More CSS options coming in future updates.</p>
    <?php
  }

  function savant_editor_theme() {
    
    $options = get_option('savant_editor_theme') ? get_option('savant_editor_theme') : null;

    ?>
      <select name="savant_editor_theme" id="savant_editor_theme">
        <option>--Select a Theme--</option>
        <option value="atom-dark" <?php selected( $options === "atom-dark") ?>>Atom Dark</option>
        <option value="vscode-dark" <?php selected( $options === "vscode-dark") ?>>VS Code Dark+</option>
        <option value="default" <?php selected( $options === "default") ?>>Code Mirror Default</option>
      </select>

      <p class="description">More Theme options coming in future updates.</p>
    <?php
  }

  function settings_minify() {
    echo '<input name="savant_editor_minify" id="savant_editor_minify" type="checkbox" value="1" class="code" ' . checked( 1, get_option( 'savant_editor_minify' ), false ) . ' /><p class="description">This setting will minify your code by removing any comments and linebreaks</p>';
  }

  function settings_babelify() {
    echo '<input name="savant_editor_babelify" id="savant_editor_babelify" type="checkbox" value="1" class="code" ' . checked( 1, get_option( 'savant_editor_babelify' ), false ) . ' /><p class="description">Compile your javascript with Babel</p>';
  }

  function settings_boilerplate() {
    $boilerplate = get_option('savant_editor_boilerplate');
    echo '<textarea rows="8" cols="80" name="savant_editor_boilerplate[css]" value"' . $boilerplate['css'] . '">' . $boilerplate['css'] . '</textarea><p class="description" style="margin-bottom: 1em;">Input some CSS boilerplate which will load in the editor whenever you add a new item</p>';
    echo '<textarea rows="8" cols="80" name="savant_editor_boilerplate[javascript]" value"'. $boilerplate['javascript'] .'">' . $boilerplate['javascript'] . '</textarea><p class="description">Input some Javascript boilerplate which will load in the editor whenever you add a new item</p>';
  }

  public function settings_link($links) {
    $settings_link = '<a href="admin.php?page=savant_settings">Settings</a>';
    array_push( $links, $settings_link );
    return $links;
  }

}
