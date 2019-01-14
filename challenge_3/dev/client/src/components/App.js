import React from 'react';
import getId from '../lib/getId.js';
import changeId from '../actions/changeId.js';
import changeErr from '../actions/changeErr.js';
import store from '../store/store.js';
import HomeContainer from '../containers/HomeContainer.js';
import F1Container from '../containers/F1Container.js';
import F2Container from '../containers/F2Container.js';
import F3Container from '../containers/F3Container.js';
import SumContainer from '../containers/SumContainer.js';
import SumEditContainer from '../containers/SumEditContainer.js';
import ThankYouContainer from '../containers/ThankYouContainer.js';


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.step === 'Home') {
      return (
        <div><HomeContainer /></div>
        )
    } else if (this.props.step === 'F1') {
      return (
        <div><F1Container /></div>
        )
    }

  }
}



// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   //call db to get the last purchase record id and increase by 1
//   //so that app does not lose the id count after page reload
//   componentDidMount() {
//     getId()
//       .then((lastId) => {
//         store.dispatch(changeId(parseInt(lastId)+1));
//         console.log(parseInt(lastId)+1);
//         console.log('App.js line 24, state is');
//         console.log(store.getState());
//       })
//   }

//   render() {
//     //const step = store.getState().step;
//     let page;
//     let id;
//     //conditional rendering child components depending on checkout step
//     console.log('App.js line 34')
//     console.log(store.getState())
//     if (store.getState().step === 'Home') {
//       page = <HomeContainer />
//     } else if (store.getState().step === 'F1') {
//       page = <F1Container />
//     }

//     id = store.getState().id
//     // switch(step) {
//     //   case 'Home':
//     //     console.log('HOME, state is :')
//     //     console.log(store.getState());
//     //     page = <HomeContainer />
//     //     break;
//     //   case 'F1':
//     //     console.log('F1, state is :')
//     //     console.log(store.getState());
//     //     page = <F1Container />
//     //     break;
//     //   case 'F2':
//     //     console.log('F2, state is :')
//     //     console.log(store.getState());
//     //     page = <F2Container />
//     //     break;
//     //   case 'F3':
//     //     console.log('F3, state is :')
//     //     console.log(store.getState());
//     //     page = <F3Container />
//     //     break;
//     //   case 'Sum':
//     //     console.log('Sum, state is :')
//     //     console.log(store.getState());
//     //     page = <SumContainer />
//     //     break;
//     //   case 'SumEdit':
//     //     console.log('SumEdit, state is :')
//     //     console.log(store.getState());
//     //     page = <SumEditContainer />
//     //     break;
//     //   case 'ThankYou':
//     //     console.log('ThankYou, state is :')
//     //     console.log(store.getState());
//     //     page = <ThankYouContainer />
//     //     break;
//     // }

//     return (
//       <div>
//         {page}
//       </div>
//     )
//   }
// }

{/* <HomeContainer />
        <F1Container />
        <F2Container />
        <F3Container />
        <SumContainer />
        <SumEditContainer />
        <ThankYouContainer /> */}
