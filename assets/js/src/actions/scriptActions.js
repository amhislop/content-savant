import { DELETE_SCRIPT, ADD_SCRIPT, UPDATE_SCRIPT } from './types';
import inputFields from '../reducers/output';
import menuFields from '../reducers/menu';
import dataObject from '../reducers/data';

export const delete_script = (scripts, props) => {
  const type = DELETE_SCRIPT;
  const { id, inputs, menuItem } = props;

  dataObject({ type, scripts, id });
  inputFields({ type, inputs });
  menuFields({ type, menuItem });
};

export const add_script = (scripts, newScript, dest) => {
  const type = ADD_SCRIPT;

  const data = dataObject({ type, scripts, data: newScript });

  menuFields({ type, data, dest: dest.menu });
  inputFields({ type, data, dest: dest.output });
};

export const update_script = (script, data, dest) => {
  const type = UPDATE_SCRIPT;

  const value = dataObject({ type, script, data });

  inputFields({ type, value, dest: dest.input });
  if (dest.menuItem)
    menuFields({ type, attr: data.attr, value, dest: dest.menuItem });
};
