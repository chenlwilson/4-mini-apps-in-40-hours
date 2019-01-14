import changeInfo from 'changeInfo.js';
import changeStep from 'changeStep.js';
import changeId from 'changeId.js';
import sendData from '../lib/sendData.js';

var showThankYou = (e) => {
  e.preventDetaul();
  var infoDefault = {
    'username': '',
    'email': '',
    'password': '',
    'address1': '',
    'address2': '',
    'city': '',
    'state': '',
    'shipping zip code' : '',
    'phone': '',
    'credit card number': '',
    'expiration date': '',
    'cvv': '',
    'billing zip code': ''
  }

  return (dispatch, getState) => {
    let state = getState();
    sendData({
      id: state.id,
      info: state.info
    })
    dispatch(changeStep('ThankYou'));
    dispatch(changeInfo(infoDefault));
    dispatch(changeId(state.id+1));
  }
}

export default showThankYou;