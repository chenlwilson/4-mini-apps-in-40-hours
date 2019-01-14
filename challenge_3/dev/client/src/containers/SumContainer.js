import { connect } from 'react-redux';
import showSumEdit from '../actions/showSumEdit.js';
import showThankYou from '../actions/showThankYou.js';
import Sum from '../components/Sum.js';

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showSumEdit: (e) => {
      dispatch(showSumEdit(e))
    },
    showThankYou: (e) => {
      dispatch(showThankYou(e))
    }
  }
}
var SumContainer = connect(mapStateToProps, mapDispatchToProps)(Sum)

export default SumContainer;