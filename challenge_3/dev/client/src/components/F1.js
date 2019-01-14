import React from 'react';
import InfoLabel from './InfoLabel.js';

var F1 = (props) => (
  <div>
      <form>
        <fieldset>
          <legend>Create Account</legend>
          { Object.keys(props.info)
            .slice(0, 3)
            .map((fieldName) =>
            <InfoLabel label = {fieldName} key = {fieldName} getInfo = {props.getInfo} info={props.info} />
          )}
        </fieldset>
        <br/>
        <button onClick={(e) => { props.showHome(e) }}>Back</button>
        <button onClick={(e) => { props.showF2(e) }}>Next</button>
      </form>
      <br/><br/>
      <div>{ props.err }</div>
      </div>
)

export default F1;