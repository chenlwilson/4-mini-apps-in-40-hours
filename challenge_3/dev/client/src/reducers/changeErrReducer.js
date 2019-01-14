import Redux from 'redux';

var changeErrReducer = (state = '', action) => {
  if (action.type === 'err') {
    return action.err
  } else {
    return state
  }
}

export default changeErrReducer;