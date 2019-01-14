import { connect } from 'react-redux';
import getInfo from '../actions/getInfo.js';
import InfoLabel from '../components/InfoLabel.js';

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    }
  }
}
var InfoLabelContainer = connect(mapStateToProps, mapDispatchToProps)(InfoLabel)

export default InfoLabelContainer;