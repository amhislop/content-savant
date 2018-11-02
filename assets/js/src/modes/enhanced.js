const CodeMirror = require('../../../../codemirror/lib/codemirror');

CodeMirror.defineSimpleMode('enhancedJS', {
  // The start state contains the rules that are intially used
  start: [
    // String
    { regex: /[\'"`](.*?)[\'"`]/, token: 'string' },
    // Keywords
    {
      regex: /(?:function|var|do|this|const|let)\b|=>/,
      token: 'keyword'
    },
    {
      regex: /(?:return|if|for|while|else)\b|=>/,
      token: 'keyword2'
    },
    // Atom
    { regex: /true|false|null|undefined/, token: 'atom' },
    // Builtins
    {
      regex: /(?:Date|Math|Number|Object|Function|Boolean|Symbol|Error|EvalError|InternalError|RangeError|ReferenceError|SyntaxError|TypeError|URIError|String|RegExp|Array|Map|Set|WeakMap|WeakSet|JSON|console)\b/,
      token: 'object'
    },
    { regex: /\.|\(|\)/, token: 'punctuation' },
    // Classes
    { regex: /(\s)([A-Z]\w*)/, token: [null, 'class'] },
    // Functions
    { regex: /(\w*)\b(?=\()/, token: 'function' },
    // Numbers
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: 'number'
    },
    // Properties
    { regex: /(\w*)\b(?=;|\.|\t|\;|\r|\n|\s|,|$|\))/, token: 'property' },
    { regex: /\/\/.*/, token: 'comment' },
    { regex: /\/(?:[^\\]|\\.)*?\//, token: 'variable-3' },
    // A next property will cause the mode to move to a different state
    { regex: /\/\*/, token: 'comment', next: 'comment' },
    { regex: /[-+\/*=<>!]+/, token: 'operator' },
    // indent and dedent properties guide autoindentation
    { regex: /[\{\[\(]/, indent: true },
    { regex: /[\}\]\)]/, dedent: true },
    { regex: /[a-z$][\w$]*/, token: 'variable' }
  ],

  comment: [
    { regex: /.*?\*\//, token: 'comment', next: 'start' },
    { regex: /.*/, token: 'comment' }
  ],

  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//'
  }
});
