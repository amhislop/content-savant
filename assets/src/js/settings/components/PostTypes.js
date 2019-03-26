export default class PostTypes extends wp.element.Component {
  state = {
    postTypes: []
  };

  async componentDidMount() {
    const nonce = document.getElementById('savant_page_nonce').value;

    const res = await fetch(ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `action=savant_get_post_types&_wpnonce=${nonce}`
    });

    const data = await res.json();
    this.setState({
      postTypes: data
    });
  }

  render() {
    const { checkedPostTypes } = this.props;
    const types = this.state.postTypes.map(type => {
      return (
        <label>
          <input
            type="checkbox"
            value={type.name}
            name="savant_workspace_settings[post_types][]"
            checked={checkedPostTypes.some(x => x == type.name)}
          />
          {type.label}
        </label>
      );
    });

    return <div>{types}</div>;
  }
}
