import changeStep from './changeStep.js';

var showF1 = (e) => {
  e.preventDetaul();
  return (dispatch) => {
    dispatch(changeStep('F1'))
  }
}

export default showF1;