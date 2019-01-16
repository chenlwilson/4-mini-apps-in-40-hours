import React from 'react';
import GameOver from './GameOver.js'
import Board from './Board.js'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.dropPiece = this.dropPiece.bind(this);
    this.togglePlayer = this.togglePlayer.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
    this.checkGame = this.checkGame.bind(this);
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
    }

    if (this.state.currentPlayer === 'black') {
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

  checkGame() {
    const currentCount = this.state.count
    const currentH = this.state.h
    const currentV = this.state.v
    const currentD = this.state.d
    const currentCD = this.state.cd
    const currentPlayer = this.state.currentPlayer
    let winNum = currentPlayer === 'red'? 4 : -4

    if (currentH.indexOf(winNum) !== -1
      || currentV.indexOf(winNum) !== -1
      || currentD.indexOf(winNum) !== -1
      || currentCD.indexOf(winNum) !== -1) {
      this.setState({
        message: currentPlayer + ' won!'
      })
    }
  }

  play(e) {
    const currentMessage = this.state.message
    const currentCount = this.state.count

    if (!currentMessage.includes('won')) {
      if (e.target.className !== 'white') {
        this.setState({
          message: 'This Column Is Full...'
        })
      } else {
        this.setState({
          count: currentCount+1,
          message: 'Click On The Top Row To Play'
        })
        this.dropPiece(e);
        if (currentCount > 6) {
          this.checkGame();
        }
        if (currentCount === 42) {
          this.setState({
            message: 'Long Game, but it\'s a tie ¯\_(ツ)_/¯'
          })
        }
        this.togglePlayer();
      }
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



