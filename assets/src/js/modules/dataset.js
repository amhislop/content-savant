export default class Savant {
  constructor() {

    // Get Scripts Object
    this.scripts = this.getInitialScripts();

    // Get Options Object
    this.options = this.getOptions();
  }

  getInitialScripts() {
    let x = {};

    for (const input of document.querySelectorAll('.savant-data input')) {
      let id = input.getAttribute('data-id');
      let attr = input.getAttribute('data-attribute');

      if (!x[id]) x[id] = {};

      x[id][attr] = input.value;
    }

    return x;
  }

  getOptions() {
    let inputs = Array.from(document.querySelectorAll('.savant-options input'));

    return inputs.reduce((acc, curr) => {
      let type = curr.dataset['attribute'];
      let attr = curr.dataset['language'] || false;

      if (!acc[type]) acc[type] = {}

      if (attr) {
        acc[type][attr] = curr.value;
      } else {
        acc[type] = curr.value;
      }


      return acc;
    }, {});
  }
}
