import changeInfo from './changeInfo.js';
import store from '../store/store.js';

var getInfo = (id, value) => {
  return (dispatch) => {
    let info = store.getState().info;
    info[id] = value;
    dispatch(changeInfo(info));
  }
}

export default getInfo;