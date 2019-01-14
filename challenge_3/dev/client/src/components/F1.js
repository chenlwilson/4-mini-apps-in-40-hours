import React from 'react';
import InfoLabelContainer from '../containers/InfoLabelContainer.js';

var F1 = (props) => (
  <div>
      <form>
        <fieldset>
          <legend>Create Account</legend>
          { Object.keys(props.info)
            .slice(0, 3)
            .map((fieldName) =>
            <InfoLabelContainer label = {fieldName} key = {fieldName} />
          )}
        </fieldset>
        <br/>
        <button onClick={(e) => { e.preventDetaul(); props.showHome() }}>Back</button>
        <button onClick={(e) => { e.preventDetaul(); props.showF2() }}>Next</button>
      </form>
      <br/><br/>
      <div>{ props.err }</div>
      </div>
)

export default F1;