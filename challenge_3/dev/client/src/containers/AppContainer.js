import { connect } from 'react-redux';
import getId from '../lib/getId.js';
import changeId from '../actions/changeId.js';
import App from '../components/App.js';

const mapStateToProps = (state) => {
  return {
    step: state.step
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeId: (id) => {
      dispatch(changeId(id));
    }
  }
}

var AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer;