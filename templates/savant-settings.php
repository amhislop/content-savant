<?php settings_errors(); ?>
<form method="post" action="options.php">
  <?php
  settings_fields( 'savant-settings-group' );
  do_settings_sections( 'savant_settings' );
  wp_nonce_field( basename( __FILE__ ), 'savant_page_nonce' );
  ?>
    <div id="savantSettings"></div>
  <?php
  submit_button();
  ?>
</form>
<style>label{display: block;}</style>
