<?php
/**
 * @package ContentSavant
 */

class SavantDeactivate
{
  public static function deactivate(){
    flush_rewrite_rules();
  }
}
