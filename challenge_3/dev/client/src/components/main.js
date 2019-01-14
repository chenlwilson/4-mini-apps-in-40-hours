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
import AppContainer from '../containers/AppContainer.js'


const Main = () => (
  <div>
    <AppContainer />
  </div>
)

export default Main;