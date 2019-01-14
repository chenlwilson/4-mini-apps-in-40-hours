import changeErr from './changeErr.js';
import changeStep from './changeStep.js';

var showSum = (e) => {
  e.preventDefault();
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
    } else if (!info.address1) {
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
    } else if (!info['credit card number']) {
      dispatch(changeErr('Missing Credit Card Number!'))
    } else if (!info['expiration date']) {
      dispatch(changeErr('Missing Expiration Date!'))
    } else if (!info.cvv) {
      dispatch(changeErr('Missing CVV!'))
    } else if (!info['billing zip code']) {
      dispatch(changeErr('Missing Billing Zip Code!'))
    } else if (info['credit card number'].length < 15 || info['credit card number'].length > 16) {
      dispatch(changeErr('Credit Card Number should be 15 or 16 Digits'))
    } else if (info['expiration date'].length !== 4) {
      dispatch(changeErr('Expiration Data should be 4 digits, e.g. 0621'))
    } else if (info.cvv.length !== 3) {
      dispatch(changeErr('CVV should be 3 digits'))
    } else if (info['billing zip code'].length !== 5) {
      dispatch(changeErr('Billing Zip Code should be 5 digits'))
    } else {
      dispatch(changeErr(''))
      dispatch(changeStep('Sum'))
    }
  }
}

export default showSum;