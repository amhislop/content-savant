import { update_script } from '../actions/scriptActions';
console.log(Babel);
export const compileCode = (code, presets) => Babel ? Babel.transform( code, { presets }).code : null;
export const updateCompiledCode = (script, value, input) => update_script( script, { attr: 'compiled', value }, { input } )