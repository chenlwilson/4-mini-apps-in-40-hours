import Redux from 'redux';
import store from '../store/store.js'

var changeStepReducer = (state = 'Home', action) => {
  if (action.type === 'step') {
    return action.step;
  } else {
    return state;
  }
}

export default changeStepReducer;