import React from 'react';
import SumLabel from 'SumLabel.js';

var Sum = (props) => (
  <div>
  <fieldset>
      <legend>Summary</legend>
      { Object.keys(props.info)
        .filter(fieldName => fieldName !== 'password')
        .map((fieldName) =>
        <SumLabel label={fieldName} key = {fieldName} info={props.info} />
      )}
  </fieldset>
  <br/>
  <button onClick={(e) => { props.showSumEdit(e) }}>Edit Info</button>
  <button onClick={(e) => { props.showThankYou(e) }}>Purchase</button>
  </div>
)

export default Sum;