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
    showSumEdit: () => {
      dispatch(showSumEdit())
    },
    showThankYou: () => {
      dispatch(showThankYou())
    }
  }
}
var SumContainer = connect(mapStateToProps, mapDispatchToProps)(Sum)

export default SumContainer;