import Redux from 'redux';

var changeIdReducer = (state = 0, action) => {
  switch(action.type) {
    case 'id':
      return action.id
    default:
      return state
  }
}

export default changeIdReducer;