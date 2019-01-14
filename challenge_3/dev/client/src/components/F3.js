import React from 'react';
import InfoLabel from 'InfoLabel.js';

var F3 = (props) => (
  <div>
    <form>
    <fieldset>
      <legend>Payment</legend>
      { Object.keys(props.info)
        .slice(9, 13)
        .map((fieldName) =>
        <InfoLabel label = {fieldName} key = {fieldName} getInfo = {props.getInfo} info={props.info} />
      )}
    </fieldset>
    <br/>
  <button onClick={(e) => { props.showF2(e) }}>Back</button>
  <button onClick={(e) => { props.showSum(e) }}>Next</button>
  </form>
    <br/><br/>
    <div>{ props.err }</div>
  </div>
)

export default F3;