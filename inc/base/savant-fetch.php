<?php
/**
* @package ContentSavant
*/

class SavantFetch
{
  function get_scripts(){
    $this->convertMetaToArray(get_post_meta(2, 'savant_field', true));
  }

  function convertMetaToArray($meta) {
    $newArr = array();

    foreach($meta as $item) {
      array_push($newArr, [
        'key'       => $item['id'],
        'label'     => $item['label'],
        'type'      => $item['type'],
        'language'  => $item['language'],
        'code'      => $item['code'],
        'file'      => $item['file']
      ]);
    }

    return $newArr;
  }
}