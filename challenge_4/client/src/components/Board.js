import React from 'react';
import TableRow from './TableRow.js'

var Board = (props) => (
  <div>
    <table id='board' onClick={ (e) => props.play(e) }>
      <tbody>
        {[1,2,3,4,5,6].map((row) => <TableRow key={row} />)}
      </tbody>
    </table>
  </div>
)

export default Board;