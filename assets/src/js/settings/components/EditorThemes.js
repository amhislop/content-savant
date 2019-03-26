export default function EditorThemes(props) {
  const themes = [
    { id: `atom-dark`, name: `Atom Dark` },
    { id: `vscode-dark`, name: `VS Code Dark+` },
    { id: `default`, name: `Code Mirror Default` }
  ];

  const themeOptions = themes.map(({ id, name }) => {
    return (
      <option value={id} selected={props.theme == id}>
        {name}
      </option>
    );
  });

  return (
    <div>
      <select
        name="savant_workspace_settings[theme]"
        id="savant_editor_theme"
        onChange={props.onChangeTheme}
      >
        <option>--Select a Theme--</option>
        {themeOptions}
      </select>
    </div>
  );
}
