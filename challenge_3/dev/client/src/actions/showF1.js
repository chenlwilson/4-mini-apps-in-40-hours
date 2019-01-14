import changeStep from './changeStep.js';
import changeErr from './changeErr.js';

var showF1 = (e) => {
  e.preventDefault();
  return function (dispatch)  {
    dispatch(changeErr(''))
    dispatch(changeStep('F1'))
  }
}

export default showF1;