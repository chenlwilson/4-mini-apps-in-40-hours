import changeStep from './changeStep.js';

var showHome = (e) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch(changeStep('Home'))
  }
}

export default showHome;