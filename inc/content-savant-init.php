<?php
/**
 * @package ContentSavant
 */

require_once plugin_dir_path( __FILE__ ) . "pages/savant-editor.php";
require_once plugin_dir_path( __FILE__ ) . "pages/savant-settings.php";
require_once plugin_dir_path( __FILE__ ) . "base/savant-enqueue.php";
require_once plugin_dir_path( __FILE__ ) . "base/savant-plugins.php";
require_once plugin_dir_path( __FILE__ ) . "base/savant-render.php";
require_once plugin_dir_path( __FILE__ ) . "base/savant-columns.php";
require_once plugin_dir_path( __FILE__ ) . "base/savant-ajax.php";

final class ContentSavantInit
{
  /**
   *  Store all the classes inside array
   *  @return array Full list of classes
   */
  public static function get_services()
  {
    return array(
      SavantEditor::class,
      SavantSettings::class,
      SavantEnqueue::class,
      SavantPlugins::class,
      SavantRender::class,
      SavantColumns::class,
      SavantAjax::class
    );
  }

  /**
   * Loop through the classes,initialise and call register function
   * @return
   */
  public static function register_services()
  {
    foreach( self::get_services() as $class ) {
      $service = self::instantiate( $class );
      if ( method_exists( $service, 'register' ) ) {
        $service -> register();
      }
    }
  }

  /**
   * Initialise the class
   * @param class $class      class from the services array
   * @return class instance   new instance of class
   */
  private static function instantiate( $class )
  {
    $service = new $class();

    return $service;
  }
}
