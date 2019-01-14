import Redux from 'redux';

var defaultInfo = {
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

var changeInfoReducer = (state = defaultInfo, action) => {
  if (action.type === 'info') {
    return action.info
  } else {
    return state;
  }
}

export default changeInfoReducer;
