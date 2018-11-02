require('../../../codemirror/mode/xml/xml');
require('../../../codemirror/mode/javascript/javascript');
require('../../../codemirror/mode/css/css');
require('../../../codemirror/mode/htmlmixed/htmlmixed');
require('../../../codemirror/addon/mode/simple');
require('./modes/enhanced');

import Savant from './modules/dataset';
import {
  isEmpty,
  uniqueID,
  getFirstScript,
  uploader,
  getFileName
} from './modules/utilities';
import {
  add_script,
  delete_script,
  update_script
} from './actions/scriptActions';

// Initialise Data
const content = new Savant();
const { scripts, options } = content;

// Setup Editor
const CodeMirror = require('../../../codemirror/lib/codemirror');
const editor = CodeMirror.fromTextArea(
  document.getElementById('savantEditor'),
  {
    lineNumbers: true,
    mode: options.mode.javascript,
    theme: options.theme,
    tabSize: 2
  }
);

const core = {
  // Cache DOM
  elements: {
    _svt: document.getElementById('savant_meta'),
    menu: document.querySelector('.savant-tab ul'),
    output: document.querySelector('.savant-data'),
    settings: document.querySelectorAll('.savant-settings .settings-field'),
    icons: document.querySelectorAll('.controls i.icon')
  },

  // Initialise User Interface
  init() {
    !isEmpty(scripts)
      ? this.setActiveScript(getFirstScript(scripts))
      : this.newSession(true);

    this.events();
  },

  events() {
    const { _svt, menu, settings, icons } = this.elements;

    // Select Item from Nav
    menu.addEventListener('click', this.selectScript.bind(this));

    // Update data object and inputs field on editor input
    editor.on('change', this.codeUpdate.bind(this));

    // Settings Fields
    settings.forEach(setting =>
      setting.addEventListener('input', this.attrUpdate.bind(this))
    );

    // Bin Item
    _svt
      .querySelector('i.trash')
      .addEventListener('click', this.deleteScript.bind(this));

    // Submits new script form
    _svt
      .querySelector('button.btn[type="submit"]')
      .addEventListener('click', this.newScript.bind(this));

    // Icon Buttons
    icons.forEach(btn =>
      btn.addEventListener('click', this.toggleMenu.bind(this))
    );

    // Toggles radio input buttons
    _svt
      .querySelectorAll('.btn.radio')
      .forEach(btn => btn.addEventListener('click', this.toggleButtons));

    // WP uploader
    _svt
      .querySelector('.file .upload')
      .addEventListener('click', this.uploadFile.bind(this));
  },

  selectScript(e) {
    if (!e.target.classList.contains('button-language')) return;

    let id = e.target.getAttribute('data-id');
    let temp = uniqueID(scripts);

    // Set Active Script
    this.setActiveScript(id);
  },

  setActiveScript(id) {
    // Set activeScript object value
    this.activeScript = {
      id,
      codeOutput: this.elements.output.querySelector(
        `input[data-id="${id}"][data-attribute="code"]`
      )
    };

    // Set Value in editor
    editor.setValue(scripts[id].code);
    editor.setOption('mode', options.mode[scripts[id].language]);
    document.querySelector('.savant-window').dataset['type'] = scripts[id].type;

    // Add Active class to button
    for (const a of this.elements.menu.children) {
      a.classList[a.dataset['id'] == id ? 'add' : 'remove']('active');
    }

    // Set settings values
    const { label, type, language, file } = scripts[id];

    for (const [key, value] of Object.entries({ label, type, language })) {
      document.querySelector(
        `.settings-field[data-attribute="${key}"]`
      ).value = value;
    }

    // Set the editor or file window
    document.querySelector('.savant-window').dataset['type'] = type;

    // Set the file tag name
    document.querySelector('.file div span').textContent = getFileName(file);
  },

  newSession(toggle) {
    document
      .querySelector('.savant-config')
      .classList[toggle ? 'add' : 'remove']('new', 'expand');
    document
      .querySelector('.savant.side-bar')
      .classList[toggle ? 'add' : 'remove']('new', 'expand');
  },

  deleteScript() {
    const { id } = this.activeScript;
    const menuItem = document.querySelector(`.savant-tab [data-id="${id}"]`);

    // Delete item from Data Object and DOM
    delete_script(scripts, {
      id,
      inputs: document.querySelectorAll(`.savant-data input[data-id="${id}"]`),
      menuItem
    });

    // If Scripts Object is not empty set Active Script to first item else set New Session Window
    if (!isEmpty(scripts)) {
      this.setActiveScript(getFirstScript(scripts));
    } else {
      this.newSession(true);
      editor.setValue('');
    }
  },

  attrUpdate(e, data = false) {
    const { id } = this.activeScript;
    const { output, menu } = this.elements;

    const attr = data.attr || e.target.dataset['attribute'];
    const value = data.value || e.target.value;

    const dest = {
      input: output.querySelector(
        `[data-id="${id}"][data-attribute="${attr}"]`
      ),
      menuItem: menu.querySelector(`[data-id="${id}"]`)
    };

    // Update Object, Menu and input fields
    update_script(scripts[id], { attr, value }, dest);

    // Set the editor to new Mode
    if (attr === 'language')
      editor.setOption('mode', options.mode[scripts[id].language]);

    // Set the editor or file window
    if (attr === 'type')
      document.querySelector('.savant-window').dataset['type'] = value;

    // Set file name under button
    if (attr === 'file') {
      document.querySelector('.file div span').textContent = getFileName(value);
    }
  },

  codeUpdate() {
    const { id, codeOutput } = this.activeScript;

    // Get the editor input, update Object and output to <input> data inputFields
    update_script(
      scripts[id],
      {
        attr: 'code',
        value: editor.getValue()
      },
      { input: codeOutput }
    );
  },

  newScript(e) {
    e.preventDefault();

    const n = document.querySelector('div.savant-config');

    // Get new data from input form
    const language = n.querySelector('.language input:checked').value;
    const label =
      n.querySelector('.label input').value || language.toUpperCase();
    const type = n.querySelector('.type input:checked').value;
    const id = uniqueID(scripts);

    // Add new script to Scripts Object
    const data = {
      id,
      language,
      type,
      label,
      code: options.boilerplate[language],
      file: ''
    };

    add_script(scripts, data, this.elements);

    // Reset Menu Toggle Icon
    this.toggleMenu(this.elements._svt.querySelector('i.icon.add-new'));

    // Reset fields
    this.newSession(false);

    // Set new active script
    this.setActiveScript(scripts[id].id);
  },

  toggleMenu(e) {
    let element = e.target || e;
    let target = element.getAttribute('menu-target');

    this.elements._svt.querySelector(`.${target}`).classList.toggle('expand');
    element.classList.toggle('open');
  },

  toggleButtons() {
    // Add Active class to button
    for (const btn of this.parentNode.children) {
      btn.classList[this == btn ? 'add' : 'remove']('active');
      btn.children[0].checked = this == btn ? true : false;
    }
  },

  uploadFile(e) {
    e.preventDefault();

    let mediaUploader = uploader();

    let attachment;

    mediaUploader.on('select', () => {
      attachment = mediaUploader
        .state()
        .get('selection')
        .first()
        .toJSON();

      this.attrUpdate(e, {
        attr: 'file',
        value: attachment.url
      });
    });

    mediaUploader.open();
  }
};

core.init();
