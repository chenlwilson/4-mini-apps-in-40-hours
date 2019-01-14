import { combineReducers } from 'redux';
import step from './changeStepReducer.js';
import err from './changeErrReducer.js';
import id from './changeIdReducer.js';
import info from './changeInfoReducer.js';

console.log('rootReducer loaded');
console.log(id);

var rootReducer = combineReducers({
  step,
  err,
  id,
  info
});

export default rootReducer;