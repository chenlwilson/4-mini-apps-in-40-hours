import { connect } from 'react-redux';
import showF1 from '../actions/showF1.js';
import getInfo from '../actions/getInfo.js';
import showF3 from '../actions/showF3.js';
import F2 from '../components/F2.js';

const mapStateToPropsF2 = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsF2 = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF1: (e) => {
      dispatch(showF1(e))
    },
    showF3: (e) => {
      dispatch(showF3(e))
    }
  }
}
var F2Container = connect(mapStateToPropsF2, mapDispatchToPropsF2)(F2)

export default F2Container;