import changeStep from './changeStep.js';

var showSumEdit = (e) => {
  e.preventDetaul();
  return (dispatch) => {
    dispatch(changeStep('SumEdit'));
  }
}

export default showSumEdit;