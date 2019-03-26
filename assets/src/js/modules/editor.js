export const getEditorSettings = ({ theme }) => {
  var editorSettings = wp.codeEditor.defaultSettings
    ? _.clone(wp.codeEditor.defaultSettings)
    : {};

  editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
    indentUnit: 2,
    tabSize: 2,
    theme
  });

  return editorSettings;
};
