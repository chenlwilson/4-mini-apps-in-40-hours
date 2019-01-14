import React from 'react';
import InfoLabel from './InfoLabel.js';

var SumEdit = (props) => (
  <div>
  <fieldset>
      <legend>Summary</legend>
      { Object.keys(props.info)
        .filter(fieldName => fieldName !== 'password')
        .map((fieldName) =>
        <InfoLabel label={fieldName} key = {fieldName} getInfo = {props.getInfo} info={props.info} />
      )}
  </fieldset>
  <br/>
  <button onClick={() => { props.showSum() }}>Confirm</button>
    <br/><br/>
    <div>{ props.err }</div>
  </div>
)

export default SumEdit;