import React from 'react';
import TableCell from './TableCell.js'

var TableRow = (props) => (
  <tr>
    {[1,2,3,4,5,6,7].map((col) => <TableCell key={col.toString()} index={props.row+col.toString()} />)}
  </tr>
)

export default TableRow;