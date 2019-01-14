import Redux from 'redux';

var changeIdReducer = (state = 0, action) => {
  if (action.type === 'id') {
    return action.id
  } else {
    return state;
  }
}

export default changeIdReducer;