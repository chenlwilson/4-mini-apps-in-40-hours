import { connect } from 'react-redux';
import showF1 from '../actions/showF1.js';
import Home from '../components/Home.js';
import store from '../store/store.js'

const mapDispatchToProps = (dispatch) => {
  return {
    showF1: () => {
      console.log('HomeContainer.js line 9');
      dispatch(showF1())
      console.log(store.getState());
    }
  }
}

var HomeContainer = connect(null, mapDispatchToProps)(Home)

export default HomeContainer;
