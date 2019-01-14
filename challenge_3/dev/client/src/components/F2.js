import React from 'react';
import InfoLabel from './InfoLabel.js';

var F2 = (props) => (
  <div>
    <form>
    <fieldset>
      <legend>Shipping Address</legend>
      { Object.keys(props.info)
        .slice(3, 9)
        .map((fieldName) =>
        <InfoLabel label = {fieldName} key = {fieldName} getInfo = {props.getInfo} info={props.info} />
      )}
    </fieldset>
    <br/>
  <button onClick={(e) => { e.preventDetaul(); props.showF1() }}>Back</button>
  <button onClick={(e) => { e.preventDetaul(); props.showF3() }}>Next</button>
  </form>
    <br/><br/>
    <div>{ props.err }</div>
  </div>
)

export default F2;