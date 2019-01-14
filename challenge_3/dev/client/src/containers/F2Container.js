import { connect } from 'react-redux';
import showF1 from '../actions/showF1.js';
import getInfo from '../actions/getInfo.js';
import showF3 from '../actions/showF3.js';
import F2 from '../components/F2.js';

console.log('F2Container loaded!');

const mapStateToProps = (state) => {
  return {
    err: state.err,
    info: state.info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF1: () => {
      dispatch(showF1())
    },
    showF3: () => {
      dispatch(showF3())
    }
  }
}
var F2Container = connect(mapStateToProps, mapDispatchToProps)(F2)

export default F2Container;