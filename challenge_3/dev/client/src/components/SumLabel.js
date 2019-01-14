import React from 'react';

var SumLabel = (props) => (
  <div>
  <label>{ props.label }: { props.info[props.label] }
  </label><br />
  </div>
);

export default SumLabel;