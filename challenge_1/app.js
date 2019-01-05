console.log('app.js loaded!');

//add event listener to all cells
var cells = document.getElementsByTagName('td');
cells.forEach(function(cell){
  cell.addEventListener('click', function(){console.log('hi')});
});

//add event listener to 'new game' button
var button = document.getElementById('reset');
button.addEventListener('click', reset);

//place function
//when click on <td>, place an X or O to the cell
function play(e) {

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

}

