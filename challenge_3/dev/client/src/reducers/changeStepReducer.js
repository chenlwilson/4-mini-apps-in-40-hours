import Redux from 'redux';

var changeStepReducer = (state = 'Home', action) => {
  switch(action.type) {
    case 'step':
      return action.step
    default:
      return state
  }
}

export default changeStepReducer;