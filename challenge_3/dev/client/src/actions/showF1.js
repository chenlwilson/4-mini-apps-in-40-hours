import changeStep from './changeStep.js';
import store from '../store/store.js';

var showF1 = () => {
  return function (dispatch)  {
    dispatch(changeStep('F1'))
  }
}

store.subscribe(showF1);

export default showF1;