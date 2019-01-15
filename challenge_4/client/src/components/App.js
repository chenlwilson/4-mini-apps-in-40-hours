import React from 'react';
import GameOver from './GameOver.js'
import Board from './Board.js'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.toggleClass = this.toggleClass.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      currentPlayer: 'red',
      message: 'Play Game'
    }

  }

  toggleClass(e) {
    e.target.className = this.state.currentPlayer
  }

  togglePlayer() {
    this.setState({
      currentPlayer: this.state.currentPlayer === 'red'? 'black' : 'red'
    })
  }

  play(e) {
    this.toggleClass(e);
    this.togglePlayer();
  }

  render () {

    return (
      <div>
        <GameOver gameOver={this.state.message}/>
        <Board play={this.play}/>
      </div>
    )
  }
}

export default App;



