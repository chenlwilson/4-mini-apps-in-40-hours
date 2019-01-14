import Redux from 'redux';

var changeErrReducer = (state = '', action) => {
  switch(action.type) {
    case 'err':
      return action.err
    default:
      return state
  }
}

export default changeErrReducer;