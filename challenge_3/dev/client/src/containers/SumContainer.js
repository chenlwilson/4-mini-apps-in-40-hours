import { connect } from 'react-redux';
import showSumEdit from '../actions/showSumEdit.js';
import showThankYou from '../actions/showThankYou.js';
import Sum from '../components/Sum.js';

const mapStateToPropsSum = (state) => {
  return {
    info: state.info
  }
}
const mapDispatchToPropsSum = (dispatch) => {
  return {
    showSumEdit: (e) => {
      dispatch(showSumEdit(e))
    },
    showThankYou: (e) => {
      dispatch(showThankYou(e))
    }
  }
}
var SumContainer = connect(mapStateToPropsSum, mapDispatchToPropsSum)(Sum)

export default SumContainer;