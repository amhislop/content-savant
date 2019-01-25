export default action => {
  switch (action.type) {
    case 'ADD_SCRIPT':
      const { data, scripts } = action;
      scripts[data.id] = data;

      return scripts[data.id];
    case 'UPDATE_SCRIPT':
      const { script, data: { attr, value } } = action;

      script[attr] = value;

      return script[attr];
    case 'DELETE_SCRIPT':
      const { id } = action;

      delete action.scripts[id];
      break;
    default:
      return;
  }
};
