import changeErr from 'changeErr.js';
import changeStep from 'changeStep.js';

var showF2 = (e) => {
  e.preventDetaul();
  return (dispatch, getState) => {
    let info = getState().info;
    if (!info.username) {
      dispatch(changeErr('Missing Username!'))
    } else if (!info.email) {
      dispatch(changeErr('Missing Email!'))
    } else if (!info.password) {
      dispatch(changeErr('Missing Password!'))
    } else if (info.username.length < 5) {
      dispatch(changeErr('Username should be 5 characters or longer.'))
    } else if (!info.email.includes('@')) {
      dispatch(changeErr('Invalid Email Address!'))
    } else if (info.password.length < 6) {
      dispatch(changeErr('Password should be 6 characters or longer.'))
    } else {
      dispatch(changeStep('F2'))
    }
  }
}

export default showF2;