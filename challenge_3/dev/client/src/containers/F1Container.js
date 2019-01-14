import { connect } from 'react-redux';
import showF2 from './../actions/showF2.js';
import getInfo from './../actions/getInfo.js';
import showF2 from './../actions/showF2.js';
import F1 from './../components/F1.js';

const mapStateToPropsF1 = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsF1 = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF2: (e) => {
      dispatch(showF2(e))
    },
    showHome: (e) => {
      dispatch(showHome(e))
    }
  }
}
var F1Container = connect(mapStateToPropsF1, mapDispatchToPropsF1)(F1)

export default F1Container;