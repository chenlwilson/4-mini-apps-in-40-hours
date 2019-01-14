import changeInfo from './changeInfo.js';

var getInfo = (id, value) => {
  return (dispatch, getState) => {
    let info = getState().info;
    info[id] = value
    dispatch(changeInfo(info));
  }
}

export default getInfo;