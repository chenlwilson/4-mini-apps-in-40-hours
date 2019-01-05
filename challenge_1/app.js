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
    console.log(count);
    check();
  }
}

//check function
//every time <td> is clicked
//check if there are 3 X or O in a row/col/diag
//if yes, call win() to end game
//check if count.X + count.O is 9
//if yes, call draw() to end game
function check() {
  if (count.X + count.O >= 5) {
    win();
  } else if (count.X + count.O === 9) {
    draw();
  }
}

//win function
//when there are 3 X or O in a row/col/diag, serve up winning msg
function win() {
  if (count.X === 3) {
    message.innerHTML = 'WINNER IS OOO! GAME OVER!';
  }
  if (count.O === 3) {
    message.innerHTML = 'WINNER IS XXX! GAME OVER!';
  }
}

//draw function
//when there are 9 placements on the board, serve up draw msg
function draw() {
  message.innerHTML = 'DRAW! GAME OVER!';
}

//reset game function
//when <button> is clicked,
//1) clear all X and O on the board
//2) reset count hash table
//3) clear game over message div
function reset() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML) {
      cells[i].innerHTML = '';
    }
  }
  count.X = 0;
  count.O = 0;
  message.innerHTML = '';
}

