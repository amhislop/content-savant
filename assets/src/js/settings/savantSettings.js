import SettingsSearch from './components/SettingsSearch';
import SettingsTable from './components/SettingsTable';
import TopBar from './components/TopBar';
import { Loader } from './components/miscOptions';

export default class savantSettings extends wp.element.Component {
  state = {
    options: {
      post_types: [],
      babel: false,
      boilerplate: { css: null, javascript: null },
      theme: 'default'
    },
    receivedOptions: false
  };

  async componentDidMount() {
    const nonce = document.getElementById('savant_page_nonce').value;

    const response = await fetch(ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `action=savant_get_options&_wpnonce=${nonce}`
    });
    const data = await response.json();

    const { post_types, babel, boilerplate, theme } = data;
    const { css, javascript } = boilerplate;

    this.setState({
      options: {
        post_types,
        babel,
        boilerplate: { css, javascript },
        theme
      },
      receivedOptions: true
    });
  }

  render() {
    const SettingsSection = this.state.receivedOptions ? (
      <SettingsTable options={this.state.options} />
    ) : (
      <Loader />
    );

    return (
      <div className="savant-settings-container">
        <TopBar />
        <SettingsSearch />
        {SettingsSection}
      </div>
    );
  }
}
