var React = require('react');
var ReactDOM = require('react-dom');
var enzyme = require('enzyme');
var chai = require('chai');
var Adapter = require('enzyme-adapter-react-16');

var configure = enzyme.configure;
var shallow = enzyme.shallow;
var expect = chai.expect

//var App = require('../dist/app.bundle.js');
function Bar() {
  return (
    <div>
      <div className="in-bar" />
    </div>
  );
}

configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<Bar />);
    const welcome = <h1 className='App-title'>Welcome to React</h1>;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});