export default class savantSettings extends wp.element.Component {
  state = {
    name: 'Aidan'
  };

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}

// class App extends wp.element.Component {
//   onClick() {
//     console.log('click');
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <Provider>
//         <Menu />
//         <div>
//           <textarea id="savantEditor" value={'code'} />
//         </div>
//         <Data />
//       </Provider>
//     );
//   }
// }

// export default App;
