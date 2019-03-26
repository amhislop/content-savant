import { getEditorSettings } from '../../modules/editor';

export default class SettingsEditor extends wp.element.Component {
  state = {
    value: null,
    theme: this.props.theme
  };

  editor = {};

  async componentDidMount() {
    const { fieldName, boilerplate, theme } = this.props;

    const mode = {};
    mode[fieldName] = fieldName;

    const defaultSettings = getEditorSettings({ theme });
    defaultSettings.codemirror.mode = fieldName;

    const editor = wp.codeEditor.initialize(
      document.getElementById(`boilerplate_${fieldName}`),
      defaultSettings
    );

    editor.codemirror.setValue(boilerplate);

    editor.codemirror.on('change', () => {
      const editorValue = editor.codemirror.getValue();
      if (editorValue !== this.state.value) {
        this.setState({ value: editorValue });
      }
    });

    this.editor = editor.codemirror;
  }

  componentDidUpdate() {
    if (this.editor.getOption('theme') !== this.props.theme) {
      this.editor.setOption('theme', this.props.theme);
    }
  }

  render() {
    const { value } = this.state;
    const { fieldName } = this.props;

    return (
      <div>
        <textarea className="editor" id={`boilerplate_${fieldName}`} />
        <input
          type="hidden"
          name={`savant_workspace_settings[boilerplate][${fieldName}]`}
          value={value}
        />
      </div>
    );
  }
}
