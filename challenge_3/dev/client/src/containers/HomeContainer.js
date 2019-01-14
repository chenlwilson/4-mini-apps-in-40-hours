import { connect } from 'react-redux';
import showF1 from './../actions/showF1.js';
import Home from './../components/Home.js';

const mapDispatchToPropsHome = (dispatch) => {
  return {
    showF1: (e) => {
      dispatch(showF1(e))
    }
  }
}

var HomeContainer = connect(null, mapDispatchToPropsHome)(Home)

export default HomeContainer;
