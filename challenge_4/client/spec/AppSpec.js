//libraries
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from "sinon";
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'

//components
import App from '../src/components/App.js';
import TopRow from '../src/components/TopRow.js'

//config
configure({ adapter: new Adapter() });

describe('Connect-Four component testing', function() {
  it('should render a dummy test div', function() {
    const wrapper = shallow(<App />);
    const testdiv = <div className='test'></div>;
    expect(wrapper.contains(testdiv)).to.equal(true);
  });

  it('should call play upon top row click', function() {
    const spy = sinon.spy();
    const wrapper = mount(<TopRow play={spy} />);
    wrapper.find("tr").first().simulate("click");
    expect(spy.calledOnce).to.equal(true);
  });

  it('should show message for a tie', function() {
    const wrapper = shallow(<App />);
    //const message = 'Game Over! Long Game, and it\'s a tie ¯\_(ツ)_/¯';
    const message = 'Click On The Top Row To Play';
    wrapper.setState({ count: 10 });
    //expect(wrapper.contains(messageDiv)).to.equal(true);
    expect(wrapper.state('message')).to.equal(message);;
  });

  it('should show message for red wins horizontally', function() {
    const wrapper = shallow(<App />);
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
    const wrapper = shallow(<App />);
    const message = 'Game Over! red won!'
    wrapper.setState({ h: [0,4,0,0,0,0] });
    expect(wrapper.state('message')).to.equal(message);;
  });

  it('should show message for black wins counter-diagonally', function() {
    const wrapper = shallow(<App />);
    const message = 'Game Over! red won!'
    wrapper.setState({ h: [0,4,0,0,0,0] });
    expect(wrapper.state('message')).to.equal(message);;
  });

});