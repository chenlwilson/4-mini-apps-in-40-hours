import changeErr from './changeErr.js';
import changeStep from './changeStep.js';

var showHome = () => {
  return (dispatch) => {
    dispatch(changeErr(''))
    dispatch(changeStep('Home'))
  }
}

export default showHome;