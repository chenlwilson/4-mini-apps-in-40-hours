import React from 'react';
import getId from '../lib/getId.js';
import changeId from '../actions/changeId.js';
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
  //call db to get the last purchase record id and increase by 1
  //so that app does not lose the id count after page reload
  // componentDidMount() {
  //   getId()
  //     .then((lastId) => {
  //       changeId(parseInt(lastId)+1);
  //     })
  //}

  render() {
    console.log('App.js line 27');
    const step = store.getState().step;
    let page;

    //conditional rendering child components depending on checkout step
    switch(step) {
      case 'Home':
        console.log('state is :')
        console.log(store.getState());
        page = <HomeContainer />
        break;
      case 'F1':
        page = <F1Container />
        break;
      case 'F2':
        page = <F2Container />
        break;
      case 'F3':
        page = <F3Container />
        break;
      case 'Sum':
        page = <SumContainer />
        break;
      case 'SumEdit':
        page = <SumEditContainer />
        break;
      case 'ThankYou':
        page = <ThankYouContainer />
        break;
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

