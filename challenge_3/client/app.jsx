//////////////////////GRANDCHILD COMPONENTS////////////////////
var Label = (props) => (
    <div>
    <label>{ props.label }: { props.info[props.label] }
    </label><br />
    </div>
);

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
    <form>
    <fieldset>
      <legend>Create Account</legend>
      <label>Name: <br />
        <input type='text' name='username' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Email: <br />
        <input type='text' name='email' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Password: <br />
        <input type='text' name='password' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
    </fieldset>
    <br/>
  <button onClick={() => { props.showF2() }}>next</button>
  </form>
  </div>
)

var F2 = (props) => (
  <div>
    <fieldset>
      <legend>Shipping Address</legend>
      <label>Address Line 1: <br />
        <input type='text' name='address1' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Address Line 2: <br />
        <input type='text' name='address2' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>City: <br />
        <input type='text' name='city' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>State: <br />
        <input type='text' name='state' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Zip Code: <br />
        <input type='text' name='shipzip' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Phone: <br />
        <input type='text' name='phone' placeholder='eg.4151234567' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
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
        <input type='text' name='cc' placeholder='eg.4143100012345678' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Expiration Data: <br />
        <input type='text' name='exp' placeholder='eg.01/21' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>CVV: <br />
        <input type='text' name='cvv' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
      <label>Billing Zip Code: <br />
        <input type='text' name='billzip' onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
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
      { Object.keys(props.info).filter(fieldName => fieldName !== 'password').map((fieldName) =>
        <Label label={fieldName} key = {fieldName} info={props.info} />
      )}
  </fieldset>
  <br/>
  <button onClick={(e) => { props.showHome(e) }}>Purchase</button>
  </div>
)

// var Sum = (props) => (
//   <div>
//     <fieldset>
//       <legend>Summary</legend>
//       <label>Name: { props.info.username }
//       </label><br />
//       <label>Email: { props.info.email }
//       </label><br />
//       <label>Shipping Address: { props.info.address1 }, { props.info.address2 }, { props.info.city }, { props.info.state } { props.info.shipzip }
//       </label><br />
//       <label>Phone: { props.info.phone }
//       </label><br />
//       <label>Credit Card Number: { props.info.cc }
//       </label><br />
//       <label>Expiration Data: { props.info.exp }
//       </label><br />
//       <label>CVV: { props.info.cvv }
//       </label><br />
//       <label>Billing Zip Code: { props.info.billzip }
//       </label><br />
//     </fieldset>
//     <br/>
//   <button onClick={(e) => { props.showHome(e) }}>Purchase</button>
//   </div>
// );

//////////////////////ROOT COMPONENT///////////////////////////
class App extends React.Component {
  constructor(props) {
    super(props);

    this.getInfo = this.getInfo.bind(this);
    this.showF1 = this.showF1.bind(this);
    this.showF2 = this.showF2.bind(this);
    this.showF3 = this.showF3.bind(this);
    this.showSum = this.showSum.bind(this);
    this.showHome = this.showHome.bind(this);

    this.state = {
      step: 'Home',
      id: 0,
      info: {
        username: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        shipzip: '',
        phone: '',
        cc: '',
        exp: '',
        cvv: '',
        billzip: ''
      }
    }

  }

  //call db to get the last purchase record id and increase by 1
  //so that app does not lose the id count after page reload
  componentDidMount() {
    this.props.getId()
      .then((lastId) => {
        this.setState({
          id: parseInt(lastId)
        })
      })
  }

  //keep track of all info on state
  getInfo(id, value) {
    var info = this.state.info
    info[id] = value;
    this.setState({
      info: info
    })
  }

  showF1() {
    //reset all info
    this.setState({
      step: 'F1',
      id: this.state.id + 1,
      info: {
        username: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        shipzip: '',
        phone: '',
        cc: '',
        exp: '',
        cvv: '',
        billzip: ''
      }
    })
  }

  showF2() {
    this.setState({
      step: 'F2'
    })
    this.props.sendData({
      id: this.state.id,
      info: this.state.info
    })
  }

  showF3() {
    this.setState({
      step: 'F3'
    })
    this.props.sendData({
      id: this.state.id,
      info: this.state.info
    })
  }

  showSum() {
    this.setState({
      step: 'Sum'
    })
    this.props.sendData({
      id: this.state.id,
      info: this.state.info
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

    //conditional rendering child components depending on checkout step
    switch(step) {
      case 'Home':
        page = <Home showF1 = {this.showF1} />
        console.log(this.state)
        break;
      case 'F1':
        page = <F1 showF2 = {this.showF2} getInfo = {this.getInfo} />
        console.log(this.state)
        break;
      case 'F2':
        page = <F2 showF3 = {this.showF3} getInfo = {this.getInfo} />
        console.log(this.state)
        break;
      case 'F3':
        page = <F3 showSum = {this.showSum} getInfo = {this.getInfo} />
        console.log(this.state)
        break;
      case 'Sum':
        page = <Sum showHome = {this.showHome} info= {this.state.info} />
        console.log(this.state);
        break;
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

// ////////////////////////CLIENT/////////////////////////////
//using fetch to handle API calls
//client post request
var sendData = (data) => {
  console.log('sending data!');
  console.log(JSON.stringify(data));
  return fetch('/checkout', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .catch(err => console.log('error: ' + err))
    .then(response => console.log('success: ' + response)
  )
}

//client get request
var getId = () => {
  return fetch('/checkout', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .catch(err => console.log('error: ' + err))
}

//pass lib functions to DOM rendering
window.sendData = sendData;
window.getId = getId;

////////////////////////DOM//////////////////////////////
ReactDOM.render(
  <App sendData = { window.sendData } getId = { window.getId } />,
  document.getElementById('app')
);