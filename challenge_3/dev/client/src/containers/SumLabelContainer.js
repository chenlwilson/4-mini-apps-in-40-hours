import { connect } from 'react-redux';
import SumLabel from '../components/SumLabel.js';

const mapStateToProps = (state) => {
  return {
    info: state.info
  }
}

var SumLabelContainer = connect(mapStateToProps)(SumLabel)

export default SumLabelContainer;
