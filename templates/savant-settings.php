<h1>Content Savant Settings</h1>
<?php settings_errors(); ?>
<form method="post" action="options.php">
  <?php
  settings_fields( 'savant-settings-group' );
  do_settings_sections( 'savant_settings' );
  submit_button();
  ?>
</form>
<style>label{display: block;}</style>
