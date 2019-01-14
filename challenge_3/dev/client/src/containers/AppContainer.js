import { connect } from 'react-redux';
//import getId from '../lib/getId.js';
import App from '../components/App.js';

const mapStateToProps = (state) => {
  return {
    step: state.step
  }
}

var AppContainer = connect(mapStateToProps)(App)

export default AppContainer;