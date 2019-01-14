import Redux from 'redux';

var defaultInfo = {
  'username': 'Jason Statham',
  'email': 'js@gmail.com',
  'password': 'jason123',
  'address1': '1 1st St.',
  'address2': '',
  'city': 'San Francisco',
  'state': 'CA',
  'shipping zip code' : '94107',
  'phone': '4150001234',
  'credit card number': '4142000012345678',
  'expiration date': '0122',
  'cvv': '123',
  'billing zip code': '94107'
}

var changeInfoReducer = (state = defaultInfo, action) => {
  if (action.type === 'info') {
    return Object.assign({}, state, action.info)
  } else {
    return state;
  }
}

export default changeInfoReducer;
