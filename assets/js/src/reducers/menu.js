export default action => {
  switch (action.type) {
    case 'ADD_SCRIPT':
      const { id, language, label } = action.data;
      const node = document.createElement('li');

      node.dataset['attribute'] = language;
      node.dataset['id'] = id;
      node.classList.add('button-language');
      node.textContent = label;

      action.dest.appendChild(node);
      break;
    case 'UPDATE_SCRIPT':
      const { attr, value, dest } = action;

      if (attr === 'label') {
        dest.textContent = value;
      } else if (attr === 'language') {
        dest.dataset['attribute'] = value;
      }

      break;
    case 'DELETE_SCRIPT':
      action.menuItem.remove();
      break;
    default:
      return;
  }
};
