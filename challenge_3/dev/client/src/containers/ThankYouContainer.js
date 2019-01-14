import { connect } from 'react-redux';
import showHome from './../actions/showHome.js';
import ThankYou from './../components/ThankYou.js';

const mapDispatchToPropsThankYou = (dispatch) => {
  return {
    showHome: (e) => {
      dispatch(showHome(e))
    }
  }
}
var ThankYouContainer = connect(null, mapDispatchToPropsThankYou)(ThankYou)

export default ThankYouContainer;