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

//play function
//when click on <td>, place an X or O to the cell
function play(e) {
  if (count.X === 0 || count.X === count.O) {
    e.target.innerHTML = 'X';
    count.X++;
    console.log(count);
  } else {
    e.target.innerHTML = 'O';
    count.O++;
    console.log(count);
  }
}

//check function
//every time <td> is clicked, check if there are 3 X or O in a row/col/diag
function check() {

}

//end game function
//when there are 3 X or O in a row/col/diag, serve end game msg html
function end() {

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

