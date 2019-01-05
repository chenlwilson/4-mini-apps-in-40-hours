console.log('app.js loaded!');

//add single event listener
var cells = document.getElementsByTagName('td');
var board = document.getElementById('board');
board.addEventListener('click', play)

//add event listener to 'new game' button
var button = document.getElementById('reset');
button.addEventListener('click', reset);

//count hash table to keep track of next play should be X or O
var count = {
  'X': 0,
  'O': 0
}

//placement hash table to keep track of all row/col/diag
var placement = {
  row: [0, 0, 0],
  col: [0, 0, 0],
  diagonal: [0, 0]
}

//lastWinner to keep track of X or O goes first in next round
var lastWinner = 'X';

//tally of the number of times X vs. O won a game
var tallyX = document.getElementById('tallyX')
var tallyO = document.getElementById('tallyO')

//gameover message div
var message = document.getElementById('gameover');

//play function
//when click on <td>, place an X or O to the cell
//then call addToPlacement() to add value to the placement hash table
//when placement is 5 or more, call checkGame()
function play(e) {
  if (!e.target.innerHTML) {
    var idRow = parseInt(e.target.id.charAt(0));
    var idCol = parseInt(e.target.id.charAt(1));
    if (lastWinner === 'X' && count.X === 0
    || lastWinner === 'X' && count.X === count.O
    || lastWinner === 'O' && count.O - count.X === 1) {
      e.target.innerHTML = 'X';
      count.X++;
      addXToPlacement(idRow, idCol);
    } else {
      e.target.innerHTML = 'O';
      count.O++;
      addOToPlacement(idRow, idCol);
    }
    if (count.X + count.O >= 5) {
      checkGame();
    }
  }
}

//addXToPlacement function
//when placing X, add 1 to corresponding row, col, diagonal
function addXToPlacement(rowIndex, colIndex) {
  placement.row[rowIndex]++;
  placement.col[colIndex]++;
  if (rowIndex === colIndex) {
    placement.diagonal[0]++;
    }
  if (rowIndex + colIndex === 2) {
    placement.diagonal[1]++;
    }
}

//addOToPlacement function
//when placing O, subtract 1 to corresponding row, col, diagonal
function addOToPlacement(rowIndex, colIndex) {
  placement.row[rowIndex]--;
  placement.col[colIndex]--;
  if (rowIndex === colIndex) {
    placement.diagonal[0]--;
    }
  if (rowIndex + colIndex === 2) {
    placement.diagonal[1]--;
    }
}

//checkGame function
//check if there are 9 placements
//if yes, serve up draw message html
//check table if there are 3 X or O in a row/col/diag
//if yes,
//1) serve up winner message html
//2) add win count to tally
//once game over, remove event listener on all cells
function checkGame() {
  if (count.X + count.O === 9) {
    message.innerHTML = 'DRAW! GAME OVER!';
  }
  if (placement.row.indexOf(3) > -1 || placement.col.indexOf(3) > -1 || placement.diagonal.indexOf(3) > -1) {
    message.innerHTML = 'WINNER IS X! GAME OVER!';
    lastWinner = 'X';
    tallyX.innerHTML++;
    board.removeEventListener('click', play);
  }
  if (placement.row.indexOf(-3) > -1 || placement.col.indexOf(-3) > -1 || placement.diagonal.indexOf(-3) > -1) {
    message.innerHTML = 'WINNER IS O! GAME OVER!';
    lastWinner = 'O';
    tallyO.innerHTML++;
    board.removeEventListener('click', play);
  }
}

//reset game function
//when <button> is clicked,
//1) clear all X and O on the board
//2) reset count hash table
//3) clear game over message div
//4) restart event listener on each cell
function reset() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML) {
      cells[i].innerHTML = '';
    }
  }

  count.X = 0;
  count.O = 0;

  message.innerHTML = '';

  placement = {
    row: [0, 0, 0],
    col: [0, 0, 0],
    diagonal: [0, 0]
  }

  board.addEventListener('click', play)
}