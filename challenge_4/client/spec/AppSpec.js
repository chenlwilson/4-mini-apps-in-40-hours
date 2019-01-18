//libraries
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from "sinon";
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'

//components
import App from '../src/components/App.js';
import Board from '../src/components/Board.js'
import GameOver from '../src/components/GameOver.js'
import TopRow from '../src/components/TopRow.js'

//config
configure({ adapter: new Adapter() });

describe('Connect-Four component testing', function() {
  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag,
    findRenderedDOMComponentsWithTag
  } = ReactTestUtils;

  let app;

  beforeEach(function() {
    app = renderIntoDocument(
      <App />
    );
  });

  //using react test utils
  it('should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });

  //using enzyme shallow
  it('should render a dummy test div', function() {
    const wrapper = shallow(<App />);
    const testdiv = <div className='test'></div>;
    expect(wrapper.contains(testdiv)).to.equal(true);
  });

  //using enzyme shallow
  it('should render a single Board component and a single GameOver component', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.find(GameOver).length).to.equal(1);
    expect(wrapper.find(Board).length).to.equal(1);
  });

  //using enzyme mount + sinon spy
  it('should call play upon top row click', function() {
    const spy = sinon.spy();
    const wrapper = mount(<TopRow play={spy} />);
    wrapper.find("tr").first().simulate("click");
    expect(spy.calledOnce).to.equal(true);
  });

  ////////////////Event in Child Component That Updates State Is Not Working////////////////
  it('should update play count when top row is clicked', function() {
    expect(React.Component.isPrototypeOf(App)).to.be.true;

    var toprow = scryRenderedDOMComponentsWithTag(app, 'tr');

    Simulate.click(toprow[0])
    Simulate.click(toprow[0])

    var whiteCells = findRenderedDOMComponentWithClass(app, 'red')

    expect(whiteCells.length).to.equal(40);
  });

  it('should show message for a tie', function() {
    const wrapper = mount(<App />);
    const message = 'Game Over! Long Game, and it\'s a tie ¯\_(ツ)_/¯';
    //const message = 'Click On The Top Row To Play';
    wrapper.setState({ count: 42 });
    console.log(wrapper);
    //expect(wrapper.contains(messageDiv)).to.equal(true);
    expect(wrapper.state('message')).to.equal(message);;
  });

  it('should show message for red wins horizontally', function() {
    const wrapper = mount(<App />);
    const message = 'Game Over! red won!'
    wrapper.setState({ h: [0,4,0,0,0,0] });
    expect(wrapper.state('currentPlayer')).to.equal('red');;
  });

  it('should show message for black wins vertically', function() {
    const wrapper = mount(<App />);
    const message = 'Game Over! black won!'
    wrapper.setState({ v: [0,-4,0,0,0,0] });
    expect(wrapper.state('message')).to.equal(message);;
  });

  it('should show message for red wins diagonally', function() {
    const wrapper = mount(<App />);
    const message = 'Game Over! red won!'
    wrapper.setState({ d: [0,4,0,0,0,0] });
    expect(wrapper.state('message')).to.equal(message);;
  });

  it('should show message for black wins counter-diagonally', function() {
    const wrapper = mount(<App />);
    const message = 'Game Over! black won!'
    wrapper.setState({ cd: [0,-4,0,0,0,0,0] });
    expect(wrapper.state('message')).to.equal(message);;
  });

});