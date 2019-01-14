import { connect } from 'react-redux';
import showF1 from '../actions/showF1.js';
import Home from '../components/Home.js';

const mapDispatchToProps = (dispatch) => {
  return {
    showF1: (e) => {
      dispatch(showF1(e))
    }
  }
}

var HomeContainer = connect(null, mapDispatchToProps)(Home)

export default HomeContainer;
