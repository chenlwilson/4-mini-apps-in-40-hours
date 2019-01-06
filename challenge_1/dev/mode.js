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

  //position hashtable to keep track of X/O
  beforePosition: {},
  afterPosition: {},

  //lastWinner to keep track of X or O goes first in next round
  lastWinner:'X',

  //mode to keep track of whether crazy mode is on/off
  crazyMode: false
}

/////////////////////////VIEW/////////////////////////////////
var view = {
  resetMessage: function() {
    var lastWinner = document.getElementById('player' + model.lastWinner).value || model.lastWinner;
    document.getElementById('message').innerHTML = lastWinner + ' Starts First';
  },

  nextMoveMessage: function(player) {
    var nextPlayer = document.getElementById('player' + player).value || player;;
    document.getElementById('message').innerHTML = nextPlayer + ', it\'s your turn!';
  },

  drawMessage: function() {
    document.getElementById('message').innerHTML = 'DRAW! GAME OVER!';
  },

  winMessage: function(player) {
    var name = document.getElementById('player' + player).value || player;
    document.getElementById('message').innerHTML = 'WINNER IS ' + name + '! GAME OVER!';
  },

  placePiece: function(e, player) {
    e.target.innerHTML = player;
    if (player === 'X') {
      e.target.style.color = "black";
    } else {
      e.target.style.color = "white";
    }
  },

  addTallyCount: function(player) {
    document.getElementById(player).innerHTML++;
  },

  crazyModeOn: function() {
    document.getElementById('mode').style.background = 'green';
  },

  crazyModeOff: function() {
    document.getElementById('mode').style.background = 'pink';
  }
}

//gameover message html
var message = document.getElementById('message');

//////////////////////////CONTROLLER///////////////////////////
var controller = {
  //play function
  //when click on <td>, place an X or O to the cell
  //then call addToPlacement() to add value to the placement hash table
  //when placement is 5 or more, call checkGame()
  play: function(e) {
    mode.removeEventListener('click', controller.toggleMode);
    // if (!e.target.innerHTML) {
      var idRow = parseInt(e.target.id.charAt(0));
      var idCol = parseInt(e.target.id.charAt(1));
      if (model.lastWinner === 'X' && model.count.X === 0
      || model.lastWinner === 'X' && model.count.X === model.count.O
      || model.lastWinner === 'O' && model.count.O - model.count.X === 1) {
        view.placePiece(e, 'X');
        model.count.X++;
        controller.addXToPlacement(idRow, idCol);
        controller.addToPosition(e.target.id, 'X');
        view.nextMoveMessage('O');
      } else {
        view.placePiece(e, 'O');
        model.count.O++;
        controller.addOToPlacement(idRow, idCol);
        controller.addToPosition(e.target.id, 'O');
        view.nextMoveMessage('X');
      }
      if (model.count.X + model.count.O >= 5) {
        controller.checkGame();
      }
      if (model.crazyMode === true) {
        controller.rotateBoard();
      }
    //}
  },

  //addXToPlacement function
  //when placing X, add 1 to corresponding row, col, diagonal
  addXToPlacement: function(rowIndex, colIndex) {
    model.placement.row[rowIndex]++;
    model.placement.col[colIndex]++;
    if (rowIndex === colIndex) {
      model.placement.diagonal[0]++;
    }
    if (rowIndex + colIndex === 2) {
      model.placement.diagonal[1]++;
    }
  },

  //addOToPlacement function
  //when placing O, subtract 1 to corresponding row, col, diagonal
  addOToPlacement: function(rowIndex, colIndex) {
    model.placement.row[rowIndex]--;
    model.placement.col[colIndex]--;
    if (rowIndex === colIndex) {
      model.placement.diagonal[0]--;
    }
    if (rowIndex + colIndex === 2) {
      model.placement.diagonal[1]--;
    }
  },

  //add X or Y to potision hash table
  addToPosition: function(coordinates, piece) {
    model.position[coordinates] = piece;
  },

  rotateBoard: function() {
    var cells = document.getElementsByTagName('td');
    for (var i = 0; i < cells.length; i++) {
      if (model.position[cells[i].id]) {
        cells[i].innerHTML = '';
        controller.rotateCell(cells[i].id);
      }
    }
    model.position = {};
    controller.refreshCells();
    controller.resetPlacement();
    console.log(model.placement);
    controller.refreshPlacement();
    console.log(model.placement);
  },

  rotateCell: function(id) {
    switch(id) {
      case '00':
        document.getElementById('02').innerHTML = model.position['00'];
        break;
      case '01':
        document.getElementById('12').innerHTML = model.position['01'];
        break;
      case '02':
        document.getElementById('22').innerHTML = model.position['02'];
        break;
      case '10':
        document.getElementById('01').innerHTML = model.position['10'];
        break;
      case '11':
        document.getElementById('11').innerHTML = model.position['11'];
        break;
      case '12':
        document.getElementById('21').innerHTML = model.position['12'];
        break;
      case '20':
        document.getElementById('00').innerHTML = model.position['20'];
        break;
      case '21':
        document.getElementById('10').innerHTML = model.position['21'];
        break;
      case '22':
        document.getElementById('20').innerHTML = model.position['22'];
        break;
    }
  },

  refreshCells: function(){
    var newCells = document.getElementsByTagName('td');
    for (var i = 0; i < newCells.length; i++) {
      if (newCells[i].innerHTML) {
        model.position[newCells[i].id] = newCells[i].innerHTML;
      }
    }
  },

  refreshPlacement: function() {
    var keys = Object.keys(model.position);
    for (var i = 0; i < keys.length; i++) {
      if (model.position[keys[i]] === 'X') {
        controller.addXToPlacement(keys[i].charAt(0), keys[i].charAt(1));
      } else if (model.position[keys[i]] === 'O') {
        controller.addOToPlacement(keys[i].charAt(0), keys[i].charAt(1));
      }
    }
  },

  resetPlacement: function() {
    model.placement.row = [0,0,0];
    model.placement.col = [0,0,0];
    model.placement.diagonal = [0,0];
  },

  //checkGame function
  //check if there are 9 placements
  //if yes, serve up draw message html
  //check table if there are 3 X or O in a row/col/diag
  //if yes,
  //1) serve up winner message html
  //2) add win count to tally html
  //once game over, remove event listener on all cells
  checkGame: function() {
    if (model.count.X + model.count.O === 9) {
      view.drawMessage();
      mode.addEventListener('click', controller.toggleMode);
    }
    if (model.placement.row.indexOf(3) > -1 || model.placement.col.indexOf(3) > -1 || model.placement.diagonal.indexOf(3) > -1) {
      view.winMessage('X');
      model.lastWinner = 'X';
      view.addTallyCount('tallyX')
      board.removeEventListener('click', controller.play);
      mode.addEventListener('click', controller.toggleMode);
    }
    if (model.placement.row.indexOf(-3) > -1 || model.placement.col.indexOf(-3) > -1 || model.placement.diagonal.indexOf(-3) > -1) {
      view.winMessage('O');
      model.lastWinner = 'O';
      view.addTallyCount('tallyO')
      board.removeEventListener('click', controller.play);
      mode.addEventListener('click', controller.toggleMode);
    }
  },

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

    model.placement = {
      row: [0, 0, 0],
      col: [0, 0, 0],
      diagonal: [0, 0]
    }

    model.position = {};

    view.resetMessage();

    mode.addEventListener('click', controller.toggleMode);
    board.addEventListener('click', controller.play);
  },

  toggleMode: function() {
    model.crazyMode = !model.crazyMode;
    if (model.crazyMode === true) {
      view.crazyModeOn();
    } else {
      view.crazyModeOff();
    }
    console.log(model.crazyMode);
  }
}

//add event listner to the board
var board = document.getElementById('board');
board.addEventListener('click', controller.play)

//add event listener to 'new game' button
var button = document.getElementById('reset');
button.addEventListener('click', controller.reset);

//add event listener to 'crazy mode' button
var mode = document.getElementById('mode');
mode.addEventListener('click', controller.toggleMode);