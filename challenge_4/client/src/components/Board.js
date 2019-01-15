import React from 'react';
import TableRow from './TableRow.js';
import TopRow from './TopRow.js';

var Board = (props) => (
  <div>
    <table id='board'>
      <tbody>
        <TopRow key='1' play={props.play}/>
        {[2,3,4,5,6].map((row) => <TableRow key={row.toString()} play={props.play}/>)}
      </tbody>
    </table>
  </div>
)

export default Board;