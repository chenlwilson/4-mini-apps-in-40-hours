//////////////////////GRANDCHILD COMPONENTS////////////////////
var InfoLabel = (props) => (
  <div>
    <label>{ props.label }:  <br />
      <input type='text' name={ props.label } value={ props.info[props.label] } onChange={(e) => { props.getInfo(e.target.name, e.target.value) }} />
      </label><br />
  </div>
)

var SumLabel = (props) => (
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
  <button onClick={ (e) => { props.showF1(e) } }>Checkout</button>
  </div>
);

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
  <button onClick={(e) => { props.showF1(e) }}>Back</button>
  <button onClick={(e) => { props.showF3(e) }}>Next</button>
  </form>
    <br/><br/>
    <div>{ props.err }</div>
  </div>
)

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

var Sum = (props) => (
  <div>
  <fieldset>
      <legend>Summary</legend>
      { Object.keys(props.info)
        .filter(fieldName => fieldName !== 'password')
        .map((fieldName) =>
        <SumLabel label={fieldName} key = {fieldName} info={props.info} />
      )}
  </fieldset>
  <br/>
  <button onClick={(e) => { props.showSumEdit(e) }}>Edit Info</button>
  <button onClick={(e) => { props.showThankYou(e) }}>Purchase</button>
  </div>
)

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
  <button onClick={(e) => { props.showSum(e) }}>Confirm</button>
  </div>
)

var ThankYou = (props) => (
  <div>
    <h1>Thank You For Your Purchase!</h1>
    <button onClick={(e) => { props.showHome(e) }}>Continue To Shop</button>
    </div>
)
//////////////////////ROOT COMPONENT///////////////////////////
class App extends React.Component {
  constructor(props) {
    super(props);

    this.getInfo = this.getInfo.bind(this);
    this.showF1 = this.showF1.bind(this);
    this.showF2 = this.showF2.bind(this);
    this.showF3 = this.showF3.bind(this);
    this.showSum = this.showSum.bind(this);
    this.showSumEdit = this.showSumEdit.bind(this);
    this.showThankYou = this.showThankYou.bind(this);
    this.showHome = this.showHome.bind(this);

    this.state = {
      step: 'Home',
      id: 0,
      info: {
        'username': '',
        'email': '',
        'password': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'shipping zip code' : '',
        'phone': '',
        'credit card number': '',
        'expiration date': '',
        'cvv': '',
        'billing zip code': ''
      }
    }

  }

  //call db to get the last purchase record id and increase by 1
  //so that app does not lose the id count after page reload
  componentDidMount() {
    this.props.getId()
      .then((lastId) => {
        this.setState({
          id: parseInt(lastId)+1
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

  showF1(e) {
    e.preventDefault();
    this.setState({
      step: 'F1'
    })
  }

  showF2(e) {
    e.preventDefault();
    if (this.state.info.username
      && this.state.info.email
      && this.state.info.password) {
        this.setState({
          step: 'F2'
        })
      }
  }

  showF3(e) {
    e.preventDefault();
    if (this.state.info.address1
      && this.state.info.city
      && this.state.info.state
      && this.state.info['shipping zip code']
      && this.state.info.phone) {
        this.setState({
          step: 'F3'
        })
      }
  }

  showSum(e) {
    var info = this.state.info

    var fields = Object.keys(this.state.info).filter((field) => {
      return field !== 'address2';
    });

    var isNotEmpty = fields.reduce((res, field) => {
      return info[field] && res;
    }, true);

    e.preventDefault();
    if (isNotEmpty) {
      this.setState({
        step: 'Sum'
      })
    }
  }

  showSumEdit(e) {
    e.preventDefault();
    this.setState({
      step: 'SumEdit'
    })
  }

  showThankYou(e) {
    e.preventDefault();
    this.props.sendData({
      id: this.state.id,
      info: this.state.info
    })
    this.setState({
      id: this.state.id+1,
      step: 'ThankYou',
      info: {
        'username': '',
        'email': '',
        'password': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'shipping zip code' : '',
        'phone': '',
        'credit card number': '',
        'expiration date': '',
        'cvv': '',
        'billing zip code': ''
      }
    })
  }

  showHome(e) {
    e.preventDefault();
    this.setState({
      step: 'Home'
    })
  }

  validateF1(e) {
    const info = this.state.info

    console.log('reset err state')

    if (!info.username) {
      this.setState({
        err: this.state.err += 'Missing Username! '
      })
    } else if (!info.email) {
      this.setState({
        err: this.state.err += 'Missing Email! '
      })
    } else if (!info.password) {
      this.setState({
        err: this.state.err += 'Missing Password! '
      })
    } else if (info.username.length < 6) {
      this.setState({
        err: this.state.err += 'Username Is Too Short! '
      })
    } else if (!info.email.includes('@')) {
      this.setState({
        err: this.state.err += 'Invalid Email! '
      })
    } else if (info.password.length < 6) {
      this.setState({
        err: this.state.err += 'Password Is Too Short! '
      })
    }

    if (this.state.err) {
      this.showF1(e);
    } else {
      this.showF2(e);
    }

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
        page = <F1 showF2 = {this.showF2} getInfo = {this.getInfo} info = {this.state.info} showHome = {this.showHome} />
        console.log(this.state)
        break;
      case 'F2':
        page = <F2 showF3 = {this.showF3} getInfo = {this.getInfo} info = {this.state.info} showF1 = {this.showF1}/>
        console.log(this.state)
        break;
      case 'F3':
        page = <F3 showSum = {this.showSum} getInfo = {this.getInfo} info = {this.state.info} showF2 = {this.showF2} />
        console.log(this.state)
        break;
      case 'Sum':
        page = <Sum showThankYou = {this.showThankYou} info = {this.state.info} showSumEdit = {this.showSumEdit} />
        console.log(this.state);
        break;
      case 'SumEdit':
        page = <SumEdit showSum = {this.showSum} getInfo = {this.getInfo} info= {this.state.info} />
        console.log(this.state);
        break;
      case 'ThankYou':
        page = <ThankYou showHome = {this.showHome} />
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