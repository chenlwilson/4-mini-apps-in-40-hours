import { connect } from 'react-redux';
import showF2 from '../actions/showF2.js';
import showHome from '../actions/showHome.js';
import getInfo from '../actions/getInfo.js';
import F1 from '../components/F1.js'

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
    showF2: (e) => {
      dispatch(showF2(e))
    },
    showHome: () => {
      dispatch(showHome())
    }
  }
}
var F1Container = connect(mapStateToProps, mapDispatchToProps)(F1)

export default F1Container;