import React from 'react';

var Home = (props) => (
  <div>
    <fieldset>
      <legend>Items</legend>
      <ul>
      <li>Manolo Blahnik, Carolyn, 70mm, Navy, Size 36</li>
      <li>Manolo Blahnik, Taylor, 90mm, Black, Size 36</li>
      <li>Manolo Blahnik, BB, 105mm, Pink, Size 36</li>
      </ul>
    </fieldset>
    <br/>
  <button onClick={ (e) => { props.showF1(e) } }>Checkout</button>
  </div>
);

export default Home;