/////////////////////CHILD COMPONENTS//////////////////////////
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
  <button onClick={() => { props.showF1() }}>checkout</button>
  </div>
);

var F1 = (props) => (
  <div>
    <fieldset>
      <legend>Create Account</legend>
      <label>Name: <br />
        <input type='text' name='username' />
      </label><br />
      <label>Email: <br />
        <input type='text' name='email' />
      </label><br />
      <label>Password: <br />
        <input type='text' name='password' />
      </label><br />
    </fieldset>
    <br/>
  <button onClick={() => { props.showF2() }}>next</button>
  </div>
)

var F2 = (props) => (
  <div>
    <fieldset>
      <legend>Shipping Address</legend>
      <label>Address Line 1: <br />
        <input type='text' name='address1' />
      </label><br />
      <label>Address Line 2: <br />
        <input type='text' name='address2' />
      </label><br />
      <label>City: <br />
        <input type='text' name='city' />
      </label><br />
      <label>State: <br />
        <input type='text' name='state' />
      </label><br />
      <label>Zip Code: <br />
        <input type='text' name='shipzip' />
      </label><br />
      <label>Phone: <br />
        <input type='text' name='phone' />
      </label><br />
    </fieldset>
    <br/>
  <button onClick={() => { props.showF3() }}>next</button>
  </div>
)

var F3 = (props) => (
  <div>
    <fieldset>
      <legend>Payment</legend>
      <label>Credit Card Number: <br />
        <input type='text' name='cc' />
      </label><br />
      <label>Expiration Data: <br />
        <input type='text' name='exp' />
      </label><br />
      <label>CVV: <br />
        <input type='text' name='cvv' />
      </label><br />
      <label>Billing Zip Code: <br />
        <input type='text' name='billzip' />
      </label><br />
    </fieldset>
    <br/>
  <button onClick={() => { props.showSum() }}>next</button>
  </div>
)

var Sum = (props) => (
  <div>
    <fieldset>
      <legend>Summary</legend>
      <label>Name: <span></span>
      </label><br />
      <label>Email: <span></span>
      </label><br />
      <label>Shipping Address: <span></span>
      </label><br />
      <label>Phone: <span></span>
      </label><br />
      <label>Credit Card Number: <span></span>
      </label><br />
      <label>Expiration Data: <span></span>
      </label><br />
      <label>CVV: <span></span>
      </label><br />
      <label>Billing Zip Code: <span></span>
      </label><br />
    </fieldset>
    <br/>
  <button onClick={() => { props.showHome() }}>Purchase</button>
  </div>
);

//////////////////////ROOT COMPONENT///////////////////////////
class App extends React.Component {
  constructor(props) {
    super(props);

    this.showF1 = this.showF1.bind(this);
    this.showF2 = this.showF2.bind(this);
    this.showF3 = this.showF3.bind(this);
    this.showSum = this.showSum.bind(this);
    this.showHome = this.showHome.bind(this);

    this.state = {
      step: 'Home',
      F1: {
        name: '',
        email: '',
        password: ''
      },
      F2: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        shipzip: '',
        phone: ''
      },
      F3: {
        cc: '',
        exp: '',
        cvv: '',
        billzip: ''
      }
    }

  }

  showF1() {
    this.setState({
      step: 'F1'
    })
  }

  showF2() {
    this.setState({
      step: 'F2'
    })
  }

  showF3() {
    this.setState({
      step: 'F3'
    })
  }

  showSum() {
    this.setState({
      step: 'Sum'
    })
  }

  showHome() {
    this.setState({
      step: 'Home'
    })
  }

  render() {
    const step = this.state.step;
    let page;

    switch(step) {
      case 'Home':
        page = <Home showF1 = {this.showF1} />
        break;
      case 'F1':
        page = <F1 showF2 = {this.showF2} />
        break;
      case 'F2':
        page = <F2 showF3 = {this.showF3} />
        break;
      case 'F3':
        page = <F3 showSum = {this.showSum} />
        break;
      case 'Sum':
        page = <Sum showHome = {this.showHome} />
        break;
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

////////////////////////DOM//////////////////////////////
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


////////////////////////CLIENT/////////////////////////////
var sendData = (data) => {
  return fetch('/checkout', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: data
  })
    .then(response => response.text())
    .then(response => console.log('success: ' + response)
    .catch(err => console.log('error: ' + err))
  )
}