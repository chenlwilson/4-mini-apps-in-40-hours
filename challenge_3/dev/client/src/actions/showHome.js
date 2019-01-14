import changeStep from 'changeStep.js';

var showHome = (e) => {
  e.preventDetaul();
  return (dispatch) => {
    dispatch(changeStep('Home'))
  }
}

export default showHome;