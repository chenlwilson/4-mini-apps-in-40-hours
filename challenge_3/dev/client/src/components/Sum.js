import React from 'react';
import SumLabelContainer from '../containers/SumLabelContainer.js';

var Sum = (props) => (
  <div>
  <fieldset>
      <legend>Summary</legend>
      { Object.keys(props.info)
        .filter(fieldName => fieldName !== 'password')
        .map((fieldName) =>
        <SumLabelContainer label={fieldName} key = {fieldName} />
      )}
  </fieldset>
  <br/>
  <button onClick={() => { props.showSumEdit() }}>Edit Info</button>
  <button onClick={() => { props.showThankYou() }}>Purchase</button>
  </div>
)

export default Sum;