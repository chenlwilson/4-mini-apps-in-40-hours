import changeStep from './changeStep.js';
import store from '../store/store.js';

var showF1 = () => {
  return function (dispatch)  {
    dispatch(changeStep('F1'))
    console.log('showF1 line 8')
    console.log(store.getState())
  }
}

store.subscribe(showF1);

export default showF1;