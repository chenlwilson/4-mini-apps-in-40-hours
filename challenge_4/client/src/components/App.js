import React from 'react';
import GameOver from './GameOver.js'
import Board from './Board.js'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.dropPiece = this.dropPiece.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      message: 'Click On The Top Row To Play',
      currentPlayer: 'red',
      count: 0
    }

  }

  togglePlayer() {
    this.setState({
      currentPlayer: this.state.currentPlayer === 'red'? 'black' : 'red'
    })
  }

  dropPiece(e) {
    //'61', '62', '63', ...
    //row = '6', col = '1'
    const col = e.target.id.split('')[1]

    for (var i = 1; i <= 6; i++) {
      let id = i+col;
      if (document.getElementById(id).className === 'white') {
        document.getElementById(id).className = this.state.currentPlayer;
        break;
      }
    }
  }

  play(e) {
    if (this.state.count === 42) {
      console.log('checkGame')
      this.setState({
        message: 'Long Game, but it\'s a tie ¯\_(ツ)_/¯'
      })
    } else if (e.target.className !== 'white') {
      this.setState({
        message: 'This Column Is Full...'
      })
    } else {
      this.setState({
        count: this.state.count+1,
        message: 'Click On The Top Row To Play'
      })
      this.dropPiece(e);
      this.togglePlayer();
    }
  }

  render () {
    return (
      <div>
        <GameOver gameOver={this.state.message}/>
        <Board play={this.play} />
      </div>
    )
  }
}

export default App;



