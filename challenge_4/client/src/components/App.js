import React from 'react';
import GameOver from './GameOver.js'
import Board from './Board.js'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.dropPiece = this.dropPiece.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
    this.play = this.play.bind(this);

    this.state = {
      message: 'Click On The Top Row To Play',
      currentPlayer: 'red',
      //number of plays
      count: 0,
      //horizonal, vertical, diagonal, counter diagonal
      h: [0,0,0,0,0,0],
      v: [0,0,0,0,0,0,0],
      d: [0,0,0,0,0,0],
      cd: [0,0,0,0,0,0,0]
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
    const id = e.target.id
    const col = id.split('')[1]

    for (let i = 1; i <= 6; i++) {
      let cellId = i+col;
      if (document.getElementById(cellId).className === 'white') {
        document.getElementById(cellId).className = this.state.currentPlayer;
        this.updatePlace(i, parseInt(col));
        break;
      }
    }
  }

  updatePlace(row, col) {
    //cell = '21'
    //row = '2', col = '1'
    //red++, black--
    const currentH = this.state.h
    const currentV = this.state.v
    const currentD = this.state.d
    const currentCD = this.state.cd

    if (this.state.currentPlayer === 'red') {
      currentH[row-1]++;
      currentV[col-1]++;
      if (row+col-5 >=0 && row+col-5 < 6) {
        currentD[row+col-5]++;
      }
      if (row-col+3 >=0 && row-col+3 < 7) {
        currentCD[row-col+3]++;
      }
      this.setState({
        h: currentH,
        v: currentV,
        d: currentD,
        cd: currentCD
      })
    } else {
      currentH[row-1]--;
      currentV[col-1]--;
      if (row+col-5 >=0 && row+col-5 < 6) {
        currentD[row+col-5]--;
      }
      if (row-col+3 >=0 && row-col+3 < 7) {
        currentCD[row-col+3]--;
      }
      this.setState({
        h: currentH,
        v: currentV,
        d: currentD,
        cd: currentCD
      })
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



