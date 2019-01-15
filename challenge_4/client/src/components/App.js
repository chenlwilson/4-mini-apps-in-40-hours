import React from 'react';
import GameOver from './GameOver.js'
import Board from './Board.js'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.toggleRed = this.toggleRed.bind(this);

    this.state = {
      color: 'white',
      message: 'Play Game'
    }

  }

  toggleRed() {
    this.setState({
      color: 'red'
    })
  }

  render () {

    return (
    <div>
      <GameOver gameOver={this.state.message}/>
      <table id='board'>
      <tbody>
      <tr onClick={ () => this.toggleRed() }>
        <td><span className={this.state.color}></span></td>
        <td><span className={this.state.color}></span></td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
        </tbody>
      </table>
    </div>

    )
  }
}

export default App;

