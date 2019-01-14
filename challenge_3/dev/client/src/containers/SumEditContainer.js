import { connect } from 'react-redux';
import showF2 from './../actions/showF2.js';
import getInfo from './../actions/getInfo.js';
import showSum from './../actions/showSum.js';
import SumEdit from './../components/SumEdit.js';

const mapStateToPropsSumEdit = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsSumEdit = (dispatch) => {
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
var SumEditContainer = connect(mapStateToPropsSumEdit, mapDispatchToPropsSumEdit)(SumEdit)

export default SumEditContainer;