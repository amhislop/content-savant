<?php
/**
* @package ContentSavant
*/

class SavantController
{
  public $plugin_path;

  public $plugin_url;

  public $plugin;

  public function __construct(){
    $this->plugin_path = plugin_dir_path( dirname( dirname(__FILE__) ) );
    $this->plugin_url = plugin_dir_url( dirname( dirname(__FILE__) ) );
    $this->plugin = plugin_basename( dirname( dirname( dirname(__FILE__) ) ) ) . '/content-savant.php';
  }
}
