import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from './components/App.js';
import store from './store/store.js'
//***************************DOM*******************************/
console.log('index.js loaded')

ReactDOM.render(
  <Provider store = {store} >
    <App />
  </Provider>,
  document.getElementById('app')
)