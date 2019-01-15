import React from 'react';
import TableRow from './TableRow.js';
import TopRow from './TopRow.js';

var Board = (props) => (
  <div>
    <table id='board'>
      <tbody>
        <TopRow key='6' play={props.play}/>
        {[5,4,3,2,1].map((row) => <TableRow key={row.toString()} row={row.toString()} />)}
      </tbody>
    </table>
  </div>
)

export default Board;