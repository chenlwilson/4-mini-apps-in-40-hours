import Redux from 'redux';

var changeStepReducer = (state = 'Home', action) => {
  if (action.type === 'step') {
    return action.step;
  } else {
    return state;
  }
}

export default changeStepReducer;