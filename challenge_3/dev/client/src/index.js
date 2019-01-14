import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store.js'
import Main from './components/Main.js';

ReactDOM.render(
  <Provider store = {store} >
    <Main />
  </Provider>,
  document.getElementById('app')
)