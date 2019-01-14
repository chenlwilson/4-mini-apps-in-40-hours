import changeErr from './changeErr.js';
import changeStep from './changeStep.js';

var showF3 = (e) => {
  e.preventDetaul();
  return (dispatch, getState) => {
    let info = getState().info;
    if (!info.address1) {
      dispatch(changeErr('Missing Address!'))
    } else if (!info.city) {
      dispatch(changeErr('Missing City Information!'))
    } else if (!info.state) {
      dispatch(changeErr('Missing State Information!'))
    } else if (!info['shipping zip code']) {
      dispatch(changeErr('Missing Shipping Zip Code!'))
    } else if (!info.phone) {
      dispatch(changeErr('Missing Phone Number!'))
    } else if (info['shipping zip code'].length !== 5) {
      dispatch(changeErr('Shipping Zip Code should be 5 digits.'))
    } else if (info.phone.length !== 10) {
      dispatch(changeErr('Phone Number should be 10 Digits, Numbers Only.'))
    } else {
      dispatch(changeStep('F3'))
    }
  }
}

export default showF3;