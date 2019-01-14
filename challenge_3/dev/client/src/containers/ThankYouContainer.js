import { connect } from 'react-redux';
import showHome from '../actions/showHome.js';
import ThankYou from '../components/ThankYou.js';

const mapDispatchToProps = (dispatch) => {
  return {
    showHome: () => {
      dispatch(showHome())
    }
  }
}
var ThankYouContainer = connect(null, mapDispatchToProps)(ThankYou)

export default ThankYouContainer;