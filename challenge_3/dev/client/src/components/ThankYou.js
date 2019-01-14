import React from 'react';

var ThankYou = (props) => (
  <div>
    <h1>Thank You For Your Purchase!</h1>
    <button onClick={(e) => { props.showHome(e) }}>Continue To Shop</button>
    </div>
)

export default ThankYou;