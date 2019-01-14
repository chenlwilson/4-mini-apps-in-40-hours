import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store/store.js'
import Main from './components/Main.js';

console.log('index.js loaded')

ReactDOM.render(
  <Provider store = {store} >
    <Main />
  </Provider>,
  document.getElementById('app')
)