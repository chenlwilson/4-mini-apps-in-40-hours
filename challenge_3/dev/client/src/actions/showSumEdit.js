import changeStep from './changeStep.js';

var showSumEdit = () => {
  return (dispatch) => {
    dispatch(changeStep('SumEdit'));
  }
}

export default showSumEdit;