import React from 'react';
import GameOver from './GameOver.js'
import Board from './Board.js'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.toggleRed = this.toggleRed.bind(this);

    this.state = {
      currentPlayer: 'red',
      message: 'Play Game'
    }

  }

  toggleRed(e) {
    e.target.className = this.state.currentPlayer
  }

  render () {

    return (
      <div>
        <GameOver gameOver={this.state.message}/>
        <Board toggleRed={this.toggleRed}/>
      </div>
    )
  }
}

export default App;



