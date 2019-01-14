import changeStep from './changeStep.js';

var showHome = () => {
  return (dispatch) => {
    dispatch(changeStep('Home'))
  }
}

export default showHome;