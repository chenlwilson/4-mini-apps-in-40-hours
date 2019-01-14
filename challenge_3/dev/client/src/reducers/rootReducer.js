import { combineReducers } from 'redux';
import step from './changeStepReducer.js';
import err from './changeErrReducer.js';
import id from './changeIdReducer.js';
import info from './changeInfoReducer.js';

var rootReducer = combineReducers({
  step,
  err,
  id,
  info
});

export default rootReducer;