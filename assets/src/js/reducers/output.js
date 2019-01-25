export default action => {
  switch (action.type) {
    case 'DELETE_SCRIPT':
      for (const input of action.inputs) {
        input.remove();
      }
      break;
    case 'ADD_SCRIPT':
      const id = action.data.id;

      for (const [key, value] of Object.entries(action.data)) {
        const node = document.createElement('input');

        node.dataset['attribute'] = key;
        node.dataset['id'] = id;
        node.name = `savant_field[${id}][${key}]`;
        node.type = 'hidden';
        node.value = value;

        action.dest.appendChild(node);
      }
      break;
    case 'UPDATE_SCRIPT':
      const { dest, value } = action;
      dest.value = value;
      break;
    default:
      return;
  }
};
