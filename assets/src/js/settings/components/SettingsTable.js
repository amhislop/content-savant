import PostTypes from './PostTypes';
import EditorThemes from './EditorThemes';
import { BabelOption } from './miscOptions';
import SettingsEditor from './SettingsEditor';

export default class SettingsTable extends wp.element.Component {
  state = {
    theme: this.props.options.theme
  };

  async onChangeTheme(e) {
    // console.log(e.target);
    await this.setState({ theme: e.target.value });
    console.log(this.state);
  }

  render() {
    const {
      post_types,
      theme,
      babel,
      boilerplate: { css, javascript }
    } = this.props.options;

    return (
      <div className="settings-table">
        <div className="settings-fields">
          <h3>General Settings</h3>
          <div className="fields">
            <div className="field-group">
              <h4>
                <span className="type">Editor: </span>Post Types
              </h4>
              <p className="description" />
              <div className="field-input">
                <PostTypes checkedPostTypes={post_types} />
              </div>
              <div className="field-group">
                <h4>
                  <span className="type">Editor: </span>Theme Settings
                </h4>
                <div className="field-input">
                  <EditorThemes
                    theme={theme}
                    onChangeTheme={this.onChangeTheme.bind(this)}
                  />
                </div>
                <p className="description">
                  More Theme options coming in future updates.
                </p>
              </div>
              <div className="field-group">
                <h4>
                  <span className="type">Features: </span>Babelify code
                </h4>
                <p className="description">
                  Compile your javascript with Babel
                </p>
                <div className="field-input">
                  <BabelOption babelOption={babel} />
                </div>
              </div>
              <div className="field-group">
                <h4>
                  <span className="type">Boilerplate: </span>CSS
                </h4>
                <p className="description">
                  Input some CSS boilerplate which will load in the editor
                  whenever you add a new CSS script
                </p>
                <div className="field-input">
                  <SettingsEditor
                    fieldName="css"
                    theme={this.state.theme}
                    boilerplate={css}
                  />
                </div>
              </div>
              <div className="field-group">
                <h4>
                  <span className="type">Boilerplate: </span>Javascript
                </h4>
                <p className="description">
                  Input some Javascript boilerplate which will load in the
                  editor whenever you add a new item
                </p>
                <div className="field-input">
                  <SettingsEditor
                    fieldName="javascript"
                    theme={this.state.theme}
                    boilerplate={javascript}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default function SettingsTable(props) {
//   const {
//     post_types,
//     theme,
//     babel,
//     boilerplate: { css, javascript }
//   } = props.options;

//   return (
//     <div className="settings-table">
//       <div className="settings-fields">
//         <h3>General Settings</h3>
//         <div className="fields">
//           <div className="field-group">
//             <h4>
//               <span className="type">Editor: </span>Post Types
//             </h4>
//             <p className="description" />
//             <div className="field-input">
//               <PostTypes checkedPostTypes={post_types} />
//             </div>
//             <div className="field-group">
//               <h4>
//                 <span className="type">Editor: </span>Theme Settings
//               </h4>
//               <div className="field-input">
//                 <EditorThemes theme={theme} />
//               </div>
//               <p className="description">
//                 More Theme options coming in future updates.
//               </p>
//             </div>
//             <div className="field-group">
//               <h4>
//                 <span className="type">Features: </span>Babelify code
//               </h4>
//               <div className="field-input">
//                 <BabelOption babelOption={babel} />
//               </div>
//               <p className="description">Compile your javascript with Babel</p>
//             </div>
//             <div className="field-group">
//               <h4>
//                 <span className="type">Boilerplate: </span>CSS
//               </h4>
//               <div className="field-input">
//                 <SettingsEditor
//                   fieldName="css"
//                   theme={theme}
//                   boilerplate={css}
//                 />
//               </div>
//               <p className="description">
//                 Input some CSS boilerplate which will load in the editor
//                 whenever you add a new CSS script
//               </p>
//             </div>
//             <div className="field-group">
//               <h4>
//                 <span className="type">Boilerplate: </span>Javascript
//               </h4>
//               <div className="field-input">
//                 <SettingsEditor
//                   fieldName="javascript"
//                   theme={theme}
//                   boilerplate={javascript}
//                 />
//               </div>
//               <p className="description">
//                 Input some Javascript boilerplate which will load in the editor
//                 whenever you add a new item
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
