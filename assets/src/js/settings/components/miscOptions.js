export const BabelOption = props => {
  return (
    <div>
      <input
        type="checkbox"
        value="1"
        name="savant_workspace_settings[babel]"
        checked={props.babelOption === '1'}
      />{' '}
      Babelify Code
    </div>
  );
};

export const Loader = () => <div>Loading</div>;
