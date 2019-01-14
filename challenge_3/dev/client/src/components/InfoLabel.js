import React from 'react';

var InfoLabel = (props) => (
  <div>
    <label>{ props.label }:  <br />
      <input type='text' name={ props.label } value={ props.info[props.label] } onChange={(e) => { console.log(e.target.value); props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
  </div>
)

export default InfoLabel;