export const getEditorSettings = ({ theme, mode: { javascript } }) => {
  console.log(wp.codeEditor);
  var editorSettings = wp.codeEditor.defaultSettings
    ? _.clone(wp.codeEditor.defaultSettings)
    : {};
  console.log('initialise');
  editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
    indentUnit: 2,
    tabSize: 2,
    theme,
    mode: javascript
  });

  return editorSettings;
};
