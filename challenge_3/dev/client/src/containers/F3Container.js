import { connect } from 'react-redux';
import showF2 from './../actions/showF2.js';
import getInfo from './../actions/getInfo.js';
import showSum from './../actions/showSum.js';
import F3 from './../components/F3.js';

const mapStateToPropsF3 = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsF3 = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF2: (e) => {
      dispatch(showF2(e))
    },
    showSum: (e) => {
      dispatch(showSum(e))
    }
  }
}
var F3Container = connect(mapStateToPropsF3, mapDispatchToPropsF3)(F3)

export default F3Container;