console.log('app.js loaded!');

////////////////////////MODEL/////////////////////////////
var model = {
  //count hash table to keep track of next play should be X or O
  count: {
    'X': 0,
    'O': 0
  },

  //placement hash table to keep track of all row/col/diag
  placement: {
    row: [0, 0, 0],
    col: [0, 0, 0],
    diagonal: [0, 0]
  },

  //lastWinner to keep track of X or O goes first in next round
  lastWinner:'X'
}

/////////////////////////VIEW/////////////////////////////////
var view = {

}
var board = document.getElementById('board');
board.addEventListener('click', play)

//add event listener to 'new game' button
var button = document.getElementById('reset');
button.addEventListener('click', reset);

//gameover message html
var message = document.getElementById('gameover');

//////////////////////////CONTROLLER///////////////////////////
var controller = {
  //reset game function
  //when <button> is clicked,
  //1) clear all X and O on the board
  //2) reset count hash table
  //3) clear game over message div
  //4) restart event listener on each cell
  reset: function() {
    var cells = document.getElementsByTagName('td');
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML) {
        cells[i].innerHTML = '';
      }
    }

    model.count.X = 0;
    model.count.O = 0;

    message.innerHTML = '';

    model.placement = {
      row: [0, 0, 0],
      col: [0, 0, 0],
      diagonal: [0, 0]
    }

    board.addEventListener('click', play)
  }
}
//play function
//when click on <td>, place an X or O to the cell
//then call addToPlacement() to add value to the placement hash table
//when placement is 5 or more, call checkGame()
function play(e) {
  if (!e.target.innerHTML) {
    var idRow = parseInt(e.target.id.charAt(0));
    var idCol = parseInt(e.target.id.charAt(1));
    if (model.lastWinner === 'X' && model.count.X === 0
    || model.lastWinner === 'X' && model.count.X === model.count.O
    || model.lastWinner === 'O' && model.count.O - model.count.X === 1) {
      e.target.innerHTML = 'X';
      model.count.X++;
      addXToPlacement(idRow, idCol);
    } else {
      e.target.innerHTML = 'O';
      model.count.O++;
      addOToPlacement(idRow, idCol);
    }
    if (model.count.X + model.count.O >= 5) {
      checkGame();
    }
  }
}

//addXToPlacement function
//when placing X, add 1 to corresponding row, col, diagonal
function addXToPlacement(rowIndex, colIndex) {
  model.placement.row[rowIndex]++;
  model.placement.col[colIndex]++;
  if (rowIndex === colIndex) {
    model.placement.diagonal[0]++;
    }
  if (rowIndex + colIndex === 2) {
    model.placement.diagonal[1]++;
    }
}

//addOToPlacement function
//when placing O, subtract 1 to corresponding row, col, diagonal
function addOToPlacement(rowIndex, colIndex) {
  model.placement.row[rowIndex]--;
  model.placement.col[colIndex]--;
  if (rowIndex === colIndex) {
    model.placement.diagonal[0]--;
    }
  if (rowIndex + colIndex === 2) {
    model.placement.diagonal[1]--;
    }
}

//checkGame function
//check if there are 9 placements
//if yes, serve up draw message html
//check table if there are 3 X or O in a row/col/diag
//if yes,
//1) serve up winner message html
//2) add win count to tally html
//once game over, remove event listener on all cells
function checkGame() {
  if (model.count.X + model.count.O === 9) {
    message.innerHTML = 'DRAW! GAME OVER!';
  }
  if (model.placement.row.indexOf(3) > -1 || model.placement.col.indexOf(3) > -1 || model.placement.diagonal.indexOf(3) > -1) {
    message.innerHTML = 'WINNER IS X! GAME OVER!';
    model.lastWinner = 'X';
    document.getElementById('tallyX').innerHTML++;
    board.removeEventListener('click', play);
  }
  if (model.placement.row.indexOf(-3) > -1 || model.placement.col.indexOf(-3) > -1 || model.placement.diagonal.indexOf(-3) > -1) {
    message.innerHTML = 'WINNER IS O! GAME OVER!';
    model.lastWinner = 'O';
    document.getElementById('tallyO').innerHTML++;
    board.removeEventListener('click', play);
  }
}