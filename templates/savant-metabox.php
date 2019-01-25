<?php
$line_numbers = get_option('savant_editor_line_numbers');
$line_indicator = get_option('savant_editor_line_indicator');
$boilerplate = get_option('savant_editor_boilerplate');
$mode = get_option('savant_editor_mode');
$theme = get_option('savant_editor_theme');
$compiler = get_option('savant_editor_babelify');
$data =  get_post_meta($post->ID, 'savant_field', true);
?>
<div class="savant side-bar<?php if(!$data) { echo ' new'; } ?> <?php echo $theme; ?>" data="<?php echo $post->ID ?>">

  <div class="savant-tab">

    <ul>
      <?php if($data) : ?>

        <?php foreach($data as $field) : ?>
          <li data-id="<?php echo $field['id']; ?>" data-attribute="<?php echo $field['language']; ?>" class="button-language"><?php echo $field['label']; ?></li>
        <?php endforeach; ?>

      <?php endif; ?>

    </ul>

  </div>

  <div class="savant-container" data-id="">

    <div class="container-body">

      <div class="savant-settings">

        <input type="hidden" class="savant_id" data-id="" data-attribute="id" value="">

        <div class="setting-container">
          <label>Label</label>
          <input data-id="" data-attribute="label" class="settings-field savant-input" value="">
        </div>

        
        <div class="setting-container">
          <label>Language</label>
          <select data-attribute="language" data-id="" class="settings-field savant-language">
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
          </select>
        </div>

        <div class="setting-container">
          <label>Type</label>
          <select data-attribute="type" data-id="" class="settings-field savant-type">
            <option value="editor">Editor</option>
            <option value="file">File</option>
          </select>
        </div>

        <div class="setting-container bin">
          <i class="icon trash"></i>
        </div>

        <div class="controls">
          <i class="icon edit-settings cog" menu-target="savant-settings"></i>
          <i class="icon add-new<?php if(!$data) { echo ' open'; }?>" menu-target="savant-config"></i>
          <i class="icon expand-window" menu-target="side-bar"></i>
        </div>

      </div>

      <div class="savant-window">

        <div class="editor">
          <textarea id="savantEditor" data-id="" data-attribute="code"></textarea>
        </div>

        <div class="file">
          <input type="button" value="Select File" class="upload button button-secondary">
          <input type="hidden" data-id="" data-attribute="file" value="">
          <div>
            <span></span>
          </div>
        </div>

      </div>

      <div class="savant-settings savant-config<?php if(!$data) { echo ' expand new'; } ?>">

        <div class="setting-container label">
            <label>Label</label>
            <input type="text" class="savant-input" placeholder="Label" value="">
        </div>

        <div class="setting-container language" data-toggle="buttons">
          <label>Language</label>
          <div class="btn-group">
            <div class="btn radio active" role="button">
              <input type="radio" value="css" checked="checked">CSS
            </div>
            <div class="btn radio" role="button">
              <input type="radio" value="javascript">JavaScript
            </div>
          </div>
        </div>

        <div class="setting-container type" data-toggle="buttons">
          <label>Type</label>
          <div class="btn-group">
            <div class="btn radio active" role="button">
              <input type="radio" value="editor" checked="checked">Editor
            </div>
            <div class="btn radio" role="button">
              <input type="radio" value="file">File
            </div>
          </div>
        </div>

        <div class="setting-container submit">
            <button class="btn" type="submit" name="config-submit">Add new</button>
        </div>

      </div>
    </div>

  </div>

  <div class="savant-options">
    <input type="hidden" data-attribute="boilerplate" data-language="css" value="<?php echo $boilerplate['css']; ?>">
    <input type="hidden" data-attribute="boilerplate" data-language="javascript" value="<?php echo $boilerplate['javascript']; ?>">
    <input type="hidden" data-attribute="mode" data-language="css" value="<?php echo $mode['css']; ?>">
    <input type="hidden" data-attribute="mode" data-language="javascript" value="<?php echo $mode['javascript']; ?>">
    <input type="hidden" data-attribute="theme" value="<?php echo $theme; ?>">

    <?php if($compiler) : ?>
      <input type="hidden" data-attribute="compiler" data-language="javascript" value="true">
    <?php endif; ?>

  </div>

  <div class="savant-data">
    <?php if($data) :?>
      <?php foreach($data as $field) : $id = $field['id']; ?>
        <input type="hidden" data-id="<?php echo $id ?>" data-attribute="id" name="savant_field[<?php echo $id ?>][id]" value="<?php echo $id ?>">
        <input type="hidden" data-id="<?php echo $id ?>" data-attribute="label" name="savant_field[<?php echo $id ?>][label]" value="<?php echo $field['label'] ?>">
        <input type="hidden" data-id="<?php echo $id ?>" data-attribute="type" name="savant_field[<?php echo $id ?>][type]" value="<?php echo $field['type'] ?>">
        <input type="hidden" data-id="<?php echo $id ?>" data-attribute="language" name="savant_field[<?php echo $id ?>][language]" value="<?php echo $field['language'] ?>">
        <input type="hidden" data-id="<?php echo $id ?>" data-attribute="code" name="savant_field[<?php echo $id ?>][code]" value="<?php echo htmlentities($field['code']) ?>">
        <input type="hidden" data-id="<?php echo $id ?>" data-attribute="file" name="savant_field[<?php echo $id ?>][file]" value="<?php echo $field['file'] ?>">

        <?php if($compiler && $field['language'] === 'javascript') : ?>
          <input type="hidden" data-id="<?php echo $id ?>" data-attribute="compiled" name="savant_field[<?php echo $id ?>][compiled]" value="<?php echo !empty($field['compiled']) ? $field['compiled'] : ''; ?>">
        <?php endif; ?>

      <?php endforeach; ?>
     <?php endif; ?>

  </div>

</div>
