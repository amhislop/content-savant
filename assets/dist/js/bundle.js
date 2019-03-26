!function o(i,c,u){function l(t,e){if(!c[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(s)return s(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var a=c[t]={exports:{}};i[t][0].call(a.exports,function(e){return l(i[t][1][e]||e)},a,a.exports,o,i,c,u)}return c[t].exports}for(var s="function"==typeof require&&require,e=0;e<u.length;e++)l(u[e]);return l}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.update_script=n.add_script=n.delete_script=void 0;var i=e("./types"),c=r(e("../reducers/output")),u=r(e("../reducers/menu")),l=r(e("../reducers/data"));function r(e){return e&&e.__esModule?e:{default:e}}n.delete_script=function(e,t){var n=i.DELETE_SCRIPT,r=t.id,a=t.inputs,o=t.menuItem;(0,l.default)({type:n,scripts:e,id:r}),(0,c.default)({type:n,inputs:a}),(0,u.default)({type:n,menuItem:o})};n.add_script=function(e,t,n){var r=i.ADD_SCRIPT,a=(0,l.default)({type:r,scripts:e,data:t});(0,u.default)({type:r,data:a,dest:n.menu}),(0,c.default)({type:r,data:a,dest:n.output})};n.update_script=function(e,t,n){var r=i.UPDATE_SCRIPT,a=(0,l.default)({type:r,script:e,data:t});(0,c.default)({type:r,value:a,dest:n.input}),n.menuItem&&(0,u.default)({type:r,attr:t.attr,value:a,dest:n.menuItem})}},{"../reducers/data":8,"../reducers/menu":9,"../reducers/output":10,"./types":2}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.UPDATE_SCRIPT=n.ADD_SCRIPT=n.DELETE_SCRIPT=void 0;n.DELETE_SCRIPT="DELETE_SCRIPT";n.ADD_SCRIPT="ADD_SCRIPT";n.UPDATE_SCRIPT="UPDATE_SCRIPT"},{}],3:[function(e,t,n){"use strict";var r=c(e("./modules/dataset")),h=e("./modules/utilities"),s=e("./actions/scriptActions"),i=e("./modules/transform"),a=e("./modules/editor"),o=c(e("./settings/SavantSettings"));function c(e){return e&&e.__esModule?e:{default:e}}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}if(document.getElementById("savantEditor")){console.log("running");var u=new r.default,g=u.scripts,l=u.options;console.log(l);var d=(0,a.getEditorSettings)(l),_=wp.codeEditor.initialize(document.getElementById("savantEditor"),d),p=null;({elements:{_svt:document.getElementById("savant_meta"),menu:document.querySelector(".savant-tab ul"),output:document.querySelector(".savant-data"),settings:document.querySelectorAll(".savant-settings .settings-field"),icons:document.querySelectorAll(".controls i.icon")},init:function(){(0,h.isEmpty)(g)?this.newSession(!0):this.setActiveScript((0,h.getFirstScript)(g)),this.events()},events:function(){var t=this,e=this.elements,n=e._svt,r=e.menu,a=e.settings,o=e.icons;r.addEventListener("click",this.selectScript.bind(this)),_.codemirror.on("change",this.codeUpdate.bind(this)),a.forEach(function(e){return e.addEventListener("input",t.attrUpdate.bind(t))}),n.querySelector("i.trash").addEventListener("click",this.deleteScript.bind(this)),n.querySelector('button.btn[type="submit"]').addEventListener("click",this.newScript.bind(this)),o.forEach(function(e){return e.addEventListener("click",t.toggleMenu.bind(t))}),n.querySelectorAll(".btn.radio").forEach(function(e){return e.addEventListener("click",t.toggleButtons)}),n.querySelector(".file .upload").addEventListener("click",this.uploadFile.bind(this))},selectScript:function(e){if(e.target.classList.contains("button-language")){var t=e.target.getAttribute("data-id");(0,h.uniqueID)(g);this.setActiveScript(t)}},setActiveScript:function(e){this.activeScript={id:e,codeOutput:this.elements.output.querySelector('input[data-id="'.concat(e,'"][data-attribute="code"]'))},_.codemirror.setValue(g[e].code),_.codemirror.setOption("mode",g[e].language),document.querySelector(".savant-window").dataset.type=g[e].type;var t=!0,n=!1,r=void 0;try{for(var a,o=this.elements.menu.children[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var i=a.value;i.classList[i.dataset.id==e?"add":"remove"]("active")}}catch(e){n=!0,r=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw r}}for(var c=g[e],u=c.label,l=c.type,s=c.language,d=c.file,p=Object.entries({label:u,type:l,language:s}),f=0;f<p.length;f++){var m=b(p[f],2),v=m[0],y=m[1];document.querySelector('.settings-field[data-attribute="'.concat(v,'"]')).value=y}document.querySelector(".savant-window").dataset.type=l,document.querySelector(".file div span").textContent=(0,h.getFileName)(d)},newSession:function(e){document.querySelector(".savant-config").classList[e?"add":"remove"]("new","expand"),document.querySelector(".savant.side-bar").classList[e?"add":"remove"]("new","expand")},deleteScript:function(){var e=this.activeScript.id,t=document.querySelector('.savant-tab [data-id="'.concat(e,'"]'));(0,s.delete_script)(g,{id:e,inputs:document.querySelectorAll('.savant-data input[data-id="'.concat(e,'"]')),menuItem:t}),(0,h.isEmpty)(g)?(this.newSession(!0),_.codemirror.setValue("")):this.setActiveScript((0,h.getFirstScript)(g))},attrUpdate:function(e){var t=e.target,n=1<arguments.length&&void 0!==arguments[1]&&arguments[1],r=this.activeScript.id,a=this.elements,o=a.output,i=a.menu,c=n.attr||t.dataset.attribute,u=n.value||t.value,l={input:o.querySelector('[data-id="'.concat(r,'"][data-attribute="').concat(c,'"]')),menuItem:i.querySelector('[data-id="'.concat(r,'"]'))};(0,s.update_script)(g[r],{attr:c,value:u},l),"language"===c&&_.setOption("mode",g[r].language),"type"===c&&(document.querySelector(".savant-window").dataset.type=u),"file"===c&&(document.querySelector(".file div span").textContent=(0,h.getFileName)(u))},codeUpdate:function(){var r=this;if(!(0,h.isEmpty)(g)){var e=this.activeScript,a=e.id,t=e.codeOutput,o=_.codemirror.getValue();(0,s.update_script)(g[a],{attr:"code",value:o},{input:t}),"javascript"===g[a].language&&l.compiler&&(clearTimeout(p),p=setTimeout(function(){var e=r.elements.output,t=(0,i.compileCode)(o,["es2015","stage-0"]),n=e.querySelector('input[name="savant_field['.concat(a,'][compiled]"]'));(0,i.updateCompiledCode)(g[a],t,n)},1e3))}},newScript:function(e){e.preventDefault();var t=document.querySelector("div.savant-config"),n=t.querySelector(".language input:checked").value,r=t.querySelector(".label input").value||n.toUpperCase(),a=t.querySelector(".type input:checked").value,o=(0,h.uniqueID)(g),i={id:o,language:n,type:a,label:r,code:l.boilerplate[n],file:""};(0,s.add_script)(g,i,this.elements),this.toggleMenu(this.elements._svt.querySelector("i.icon.add-new")),this.newSession(!1),this.setActiveScript(g[o].id)},toggleMenu:function(e){var t=e.target||e,n=t.getAttribute("menu-target");this.elements._svt.querySelector(".".concat(n)).classList.toggle("expand"),t.classList.toggle("open")},toggleButtons:function(){var e=!0,t=!1,n=void 0;try{for(var r,a=this.parentNode.children[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var o=r.value;o.classList[this==o?"add":"remove"]("active"),o.children[0].checked=this==o}}catch(e){t=!0,n=e}finally{try{e||null==a.return||a.return()}finally{if(t)throw n}}},uploadFile:function(e){var t=this;e.preventDefault();var n,r=(0,h.uploader)();r.on("select",function(){n=r.state().get("selection").first().toJSON(),t.attrUpdate(e,{attr:"file",value:n.url})}),r.open()}}).init()}document.querySelector("#savantSettings")&&wp.element.render(React.createElement(o.default,null),document.getElementById("savantSettings"))},{"./actions/scriptActions":1,"./modules/dataset":4,"./modules/editor":5,"./modules/transform":6,"./modules/utilities":7,"./settings/SavantSettings":11}],4:[function(e,t,n){"use strict";function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scripts=this.getInitialScripts(),this.options=this.getOptions()}var t,n,r;return t=e,(n=[{key:"getInitialScripts",value:function(){var e={},t=!0,n=!1,r=void 0;try{for(var a,o=document.querySelectorAll(".savant-data input")[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var i=a.value,c=i.getAttribute("data-id"),u=i.getAttribute("data-attribute");e[c]||(e[c]={}),e[c][u]=i.value}}catch(e){n=!0,r=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw r}}return e}},{key:"getOptions",value:function(){return Array.from(document.querySelectorAll(".savant-options input")).reduce(function(e,t){var n=t.dataset.attribute,r=t.dataset.language||!1;return e[n]||(e[n]={}),r?e[n][r]=t.value:e[n]=t.value,e},{})}}])&&a(t.prototype,n),r&&a(t,r),e}();n.default=r},{}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getEditorSettings=void 0;n.getEditorSettings=function(e){var t=e.theme,n=wp.codeEditor.defaultSettings?_.clone(wp.codeEditor.defaultSettings):{};return n.codemirror=_.extend({},n.codemirror,{indentUnit:2,tabSize:2,theme:t}),n}},{}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.updateCompiledCode=n.compileCode=void 0;var r=e("../actions/scriptActions");n.compileCode=function(e,t){return Babel?Babel.transform(e,{presets:t}).code:null};n.updateCompiledCode=function(e,t,n){return(0,r.update_script)(e,{attr:"compiled",value:t},{input:n})}},{"../actions/scriptActions":1}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.uploader=n.getFileName=n.getFirstScript=n.uniqueID=n.isEmpty=void 0;n.isEmpty=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0};n.uniqueID=function e(t){for(var n=Math.floor(9999999*Math.random()+1),r=!0,a=Object.keys(t),o=0;o<a.length;o++)n==a[o]&&(r=!1);if(r)return n;e(t)};n.getFirstScript=function(e){return Object.keys(e)[0]};n.getFileName=function(e){return e.replace(/(.*)wp-content/g,"....")};n.uploader=function(){return wp.media.frames.file_frame=wp.media({title:"Choose a File",button:{text:"Choose File"},multiple:!1})}},{}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=function(e){switch(e.type){case"ADD_SCRIPT":var t=e.data,n=e.scripts;return n[t.id]=t,n[t.id];case"UPDATE_SCRIPT":var r=e.script,a=e.data,o=a.attr,i=a.value;return r[o]=i,r[o];case"DELETE_SCRIPT":var c=e.id;delete e.scripts[c];break;default:return}}},{}],9:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=function(e){switch(e.type){case"ADD_SCRIPT":var t=e.data,n=t.id,r=t.language,a=t.label,o=document.createElement("li");o.dataset.attribute=r,o.dataset.id=n,o.classList.add("button-language"),o.textContent=a,e.dest.appendChild(o);break;case"UPDATE_SCRIPT":var i=e.attr,c=e.value,u=e.dest;"label"===i?u.textContent=c:"language"===i&&(u.dataset.attribute=c);break;case"DELETE_SCRIPT":e.menuItem.remove();break;default:return}}},{}],10:[function(e,t,n){"use strict";function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=function(e){switch(e.type){case"DELETE_SCRIPT":var t=!0,n=!1,r=void 0;try{for(var a,o=e.inputs[Symbol.iterator]();!(t=(a=o.next()).done);t=!0)a.value.remove()}catch(e){n=!0,r=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw r}}break;case"ADD_SCRIPT":for(var i=e.data.id,c=Object.entries(e.data),u=0;u<c.length;u++){var l=v(c[u],2),s=l[0],d=l[1],p=document.createElement("input");p.dataset.attribute=s,p.dataset.id=i,p.name="savant_field[".concat(i,"][").concat(s,"]"),p.type="hidden",p.value=d,e.dest.appendChild(p)}break;case"UPDATE_SCRIPT":var f=e.dest,m=e.value;f.value=m;break;default:return}}},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(e("./components/SettingsSearch")),i=r(e("./components/SettingsTable")),u=r(e("./components/TopBar")),l=e("./components/miscOptions");function r(e){return e&&e.__esModule?e:{default:e}}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,a)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var a=function(e){function s(){var e,t,n,r,a,o,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);for(var c=arguments.length,u=new Array(c),l=0;l<c;l++)u[l]=arguments[l];return n=this,t=!(r=(e=m(s)).call.apply(e,[this].concat(u)))||"object"!==d(r)&&"function"!=typeof r?v(n):r,a=v(t),i={options:{post_types:[],babel:!(o="state"),boilerplate:{css:null,javascript:null},theme:"default"},receivedOptions:!1},o in a?Object.defineProperty(a,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[o]=i,t}var t,n,r,c,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(s,wp.element.Component),t=s,(n=[{key:"componentDidMount",value:(c=regeneratorRuntime.mark(function e(){var t,n,r,a,o,i,c,u,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("savant_page_nonce").value,e.next=3,fetch(ajaxurl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"action=savant_get_options&_wpnonce=".concat(t)});case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,a=r.post_types,o=r.babel,i=r.boilerplate,c=r.theme,u=i.css,l=i.javascript,this.setState({options:{post_types:a,babel:o,boilerplate:{css:u,javascript:l},theme:c},receivedOptions:!0});case 10:case"end":return e.stop()}},e,this)}),a=function(){var e=this,i=arguments;return new Promise(function(t,n){var r=c.apply(e,i);function a(e){p(r,t,n,a,o,"next",e)}function o(e){p(r,t,n,a,o,"throw",e)}a(void 0)})},function(){return a.apply(this,arguments)})},{key:"render",value:function(){var e=this.state.receivedOptions?React.createElement(i.default,{options:this.state.options}):React.createElement(l.Loader,null);return React.createElement("div",{className:"savant-settings-container"},React.createElement(u.default,null),React.createElement(o.default,null),e)}}])&&f(t.prototype,n),r&&f(t,r),s}();n.default=a},{"./components/SettingsSearch":15,"./components/SettingsTable":16,"./components/TopBar":17,"./components/miscOptions":18}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(r){var e=[{id:"atom-dark",name:"Atom Dark"},{id:"vscode-dark",name:"VS Code Dark+"},{id:"default",name:"Code Mirror Default"}].map(function(e){var t=e.id,n=e.name;return React.createElement("option",{value:t,selected:r.theme==t},n)});return React.createElement("div",null,React.createElement("select",{name:"savant_workspace_settings[theme]",id:"savant_editor_theme",onChange:r.onChangeTheme},React.createElement("option",null,"--Select a Theme--"),e))}},{}],13:[function(e,t,n){"use strict";function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,a)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(e){function s(){var e,t,n,r,a,o,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);for(var c=arguments.length,u=new Array(c),l=0;l<c;l++)u[l]=arguments[l];return n=this,t=!(r=(e=p(s)).call.apply(e,[this].concat(u)))||"object"!==d(r)&&"function"!=typeof r?f(n):r,a=f(t),i={postTypes:[]},(o="state")in a?Object.defineProperty(a,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[o]=i,t}var t,n,r,c,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(s,wp.element.Component),t=s,(n=[{key:"componentDidMount",value:(c=regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("savant_page_nonce").value,e.next=3,fetch(ajaxurl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"action=savant_get_post_types&_wpnonce=".concat(t)});case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,this.setState({postTypes:r});case 8:case"end":return e.stop()}},e,this)}),a=function(){var e=this,i=arguments;return new Promise(function(t,n){var r=c.apply(e,i);function a(e){u(r,t,n,a,o,"next",e)}function o(e){u(r,t,n,a,o,"throw",e)}a(void 0)})},function(){return a.apply(this,arguments)})},{key:"render",value:function(){var e=this.props.checkedPostTypes,t=this.state.postTypes.map(function(t){return React.createElement("label",null,React.createElement("input",{type:"checkbox",value:t.name,name:"savant_workspace_settings[post_types][]",checked:e.some(function(e){return e==t.name})}),t.label)});return React.createElement("div",null,t)}}])&&o(t.prototype,n),r&&o(t,r),s}();n.default=r},{}],14:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var l=e("../../modules/editor");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,a)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=function(e){function c(){var e,t,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return n=this,m(f(t=!(r=(e=p(c)).call.apply(e,[this].concat(o)))||"object"!==s(r)&&"function"!=typeof r?f(n):r),"state",{value:null,theme:t.props.theme}),m(f(t),"editor",{}),t}var t,n,r,u,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(c,wp.element.Component),t=c,(n=[{key:"componentDidMount",value:(u=regeneratorRuntime.mark(function e(){var t,n,r,a,o,i,c=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props,n=t.fieldName,r=t.boilerplate,a=t.theme,{}[n]=n,(o=(0,l.getEditorSettings)({theme:a})).codemirror.mode=n,(i=wp.codeEditor.initialize(document.getElementById("boilerplate_".concat(n)),o)).codemirror.setValue(r),i.codemirror.on("change",function(){var e=i.codemirror.getValue();e!==c.state.value&&c.setState({value:e})}),this.editor=i.codemirror;case 9:case"end":return e.stop()}},e,this)}),a=function(){var e=this,i=arguments;return new Promise(function(t,n){var r=u.apply(e,i);function a(e){d(r,t,n,a,o,"next",e)}function o(e){d(r,t,n,a,o,"throw",e)}a(void 0)})},function(){return a.apply(this,arguments)})},{key:"componentDidUpdate",value:function(){this.editor.getOption("theme")!==this.props.theme&&this.editor.setOption("theme",this.props.theme)}},{key:"render",value:function(){var e=this.state.value,t=this.props.fieldName;return React.createElement("div",null,React.createElement("textarea",{className:"editor",id:"boilerplate_".concat(t)}),React.createElement("input",{type:"hidden",name:"savant_workspace_settings[boilerplate][".concat(t,"]"),value:e}))}}])&&o(t.prototype,n),r&&o(t,r),c}();n.default=r},{"../../modules/editor":5}],15:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){return React.createElement("div",{className:"settings-search"},React.createElement("input",{type:"text"}),React.createElement("span",null,"Queries found"))}},{}],16:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=r(e("./PostTypes")),l=r(e("./EditorThemes")),d=e("./miscOptions"),p=r(e("./SettingsEditor"));function r(e){return e&&e.__esModule?e:{default:e}}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,a)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var a=function(e){function s(){var e,t,n,r,a,o,i;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);for(var c=arguments.length,u=new Array(c),l=0;l<c;l++)u[l]=arguments[l];return n=this,t=!(r=(e=v(s)).call.apply(e,[this].concat(u)))||"object"!==f(r)&&"function"!=typeof r?y(n):r,a=y(t),o="state",i={theme:t.props.options.theme},o in a?Object.defineProperty(a,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[o]=i,t}var t,n,r,c,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(s,wp.element.Component),t=s,(n=[{key:"onChangeTheme",value:(c=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({theme:t.target.value});case 2:console.log(this.state);case 3:case"end":return e.stop()}},e,this)}),a=function(){var e=this,i=arguments;return new Promise(function(t,n){var r=c.apply(e,i);function a(e){m(r,t,n,a,o,"next",e)}function o(e){m(r,t,n,a,o,"throw",e)}a(void 0)})},function(e){return a.apply(this,arguments)})},{key:"render",value:function(){var e=this.props.options,t=e.post_types,n=e.theme,r=e.babel,a=e.boilerplate,o=a.css,i=a.javascript;return React.createElement("div",{className:"settings-table"},React.createElement("div",{className:"settings-fields"},React.createElement("h3",null,"General Settings"),React.createElement("div",{className:"fields"},React.createElement("div",{className:"field-group"},React.createElement("h4",null,React.createElement("span",{className:"type"},"Editor: "),"Post Types"),React.createElement("p",{className:"description"}),React.createElement("div",{className:"field-input"},React.createElement(u.default,{checkedPostTypes:t})),React.createElement("div",{className:"field-group"},React.createElement("h4",null,React.createElement("span",{className:"type"},"Editor: "),"Theme Settings"),React.createElement("div",{className:"field-input"},React.createElement(l.default,{theme:n,onChangeTheme:this.onChangeTheme.bind(this)})),React.createElement("p",{className:"description"},"More Theme options coming in future updates.")),React.createElement("div",{className:"field-group"},React.createElement("h4",null,React.createElement("span",{className:"type"},"Features: "),"Babelify code"),React.createElement("p",{className:"description"},"Compile your javascript with Babel"),React.createElement("div",{className:"field-input"},React.createElement(d.BabelOption,{babelOption:r}))),React.createElement("div",{className:"field-group"},React.createElement("h4",null,React.createElement("span",{className:"type"},"Boilerplate: "),"CSS"),React.createElement("p",{className:"description"},"Input some CSS boilerplate which will load in the editor whenever you add a new CSS script"),React.createElement("div",{className:"field-input"},React.createElement(p.default,{fieldName:"css",theme:this.state.theme,boilerplate:o}))),React.createElement("div",{className:"field-group"},React.createElement("h4",null,React.createElement("span",{className:"type"},"Boilerplate: "),"Javascript"),React.createElement("p",{className:"description"},"Input some Javascript boilerplate which will load in the editor whenever you add a new item"),React.createElement("div",{className:"field-input"},React.createElement(p.default,{fieldName:"javascript",theme:this.state.theme,boilerplate:i})))))))}}])&&o(t.prototype,n),r&&o(t,r),s}();n.default=a},{"./EditorThemes":12,"./PostTypes":13,"./SettingsEditor":14,"./miscOptions":18}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){return React.createElement("div",{className:"top-bar"},React.createElement("ul",null,React.createElement("li",null,"{ }")))}},{}],18:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Loader=n.BabelOption=void 0;n.BabelOption=function(e){return React.createElement("div",null,React.createElement("input",{type:"checkbox",value:"1",name:"savant_workspace_settings[babel]",checked:"1"===e.babelOption})," ","Babelify Code")};n.Loader=function(){return React.createElement("div",null,"Loading")}},{}]},{},[3]);
//# sourceMappingURL=bundle.js.map
