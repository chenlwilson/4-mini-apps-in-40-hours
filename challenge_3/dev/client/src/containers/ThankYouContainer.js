import { connect } from 'react-redux';
import showHome from '../actions/showHome.js';
import ThankYou from '../components/ThankYou.js';

const mapDispatchToProps = (dispatch) => {
  return {
    showHome: (e) => {
      dispatch(showHome(e))
    }
  }
}
var ThankYouContainer = connect(null, mapDispatchToProps)(ThankYou)

export default ThankYouContainer;