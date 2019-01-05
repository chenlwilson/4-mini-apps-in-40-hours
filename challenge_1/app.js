console.log('app.js loaded!');

//add event listener to all cells
var cells = document.getElementsByTagName('td');
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', play);
}

//add event listener to 'new game' button
var button = document.getElementById('reset');
button.addEventListener('click', reset);

//count hash table to keep track of next play should be X or O
var count = {
  'X': 0,
  'O': 0
}

//gameover message div
var message = document.getElementById('gameover');

//play function
//when click on <td>, place an X or O to the cell
//after placement, call check()
function play(e) {
  if (!e.target.innerHTML) {
    if (count.X === 0 || count.X === count.O) {
      e.target.innerHTML = 'X';
      count.X++;
    } else {
      e.target.innerHTML = 'O';
      count.O++;
    }
    check();
  }
}

//check function
//every time <td> is clicked
//1) check if there are 3 X or O in a row/col/diag
//2) check if count.X + count.O is 9
//if yes, call end() to end game
function check() {
  if (count.X + count.O === 9) {
    end();
  }
}

//end game function
//when there are 3 X or O in a row/col/diag, serve end game msg html
function end() {
  message.innerHTML = 'DRAW! GAME OVER!';
}

//reset game function
//when <button> is clicked, clear all X and O on the board
function reset() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML) {
      cells[i].innerHTML = '';
    }
  }
}

