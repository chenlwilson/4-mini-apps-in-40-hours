import { combineReducers } from 'redux';
import changeStepReducer from 'changeStepReducer.js';
import changeErrReducer from 'changeErrReducer.js';
import changeIdReducer from 'changeIdReducer.js';
import changeInfoReducer from 'changeInfoReducer.js';

var rootReducer = combineReducers({
  changeStep: changeStepReducer,
  changeErr: changeErrReducer,
  changeId: changeIdReducer,
  changeInfo: changeInfoReducer
})

export default rootReducer;