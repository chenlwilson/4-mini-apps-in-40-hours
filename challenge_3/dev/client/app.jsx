import React from 'react';
import Redux from 'redux';
import { connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import Provider from 'react-redux';
import thunk from 'redux-thunk';

/***************************REDUX*******************************/

///////////////////////////ACTIONS/////////////////////////////
var changeStep = (step) => {
  return {
    type: 'step',
    step: step
  }
}

var changeErr = (err) => {
  return {
    type: 'err',
    err: err
  }
}

var changeId = (id) => {
  return {
    type: 'id',
    id: id
  }
}

var changeInfo = (info) => {
  return {
    type: 'info',
    info: info
  }
}

var getInfo = (id, value) => {
  return (dispatch, getState) => {
    let info = getState().info;
    info[id] = value
    dispatch(changeInfo(info));
  }
}

var showHome = (e) => {
  e.preventDetaul();
  return (dispatch) => {
    dispatch(changeStep('Home'))
  }
}

var showF1 = (e) => {
  e.preventDetaul();
  return (dispatch) => {
    dispatch(changeStep('F1'))
  }
}

var showF2 = (e) => {
  e.preventDetaul();
  return (dispatch, getState) => {
    let info = getState().info;
    if (!info.username) {
      dispatch(changeErr('Missing Username!'))
    } else if (!info.email) {
      dispatch(changeErr('Missing Email!'))
    } else if (!info.password) {
      dispatch(changeErr('Missing Password!'))
    } else if (info.username.length < 5) {
      dispatch(changeErr('Username should be 5 characters or longer.'))
    } else if (!info.email.includes('@')) {
      dispatch(changeErr('Invalid Email Address!'))
    } else if (info.password.length < 6) {
      dispatch(changeErr('Password should be 6 characters or longer.'))
    } else {
      dispatch(changeStep('F2'))
  }
}

var showF3 = (e) => {
  e.preventDetaul();
  return (dispatch, getState) => {
    let info = getState().info;
    if (!info.address1) {
      dispatch(changeErr('Missing Address!'))
    } else if (!info.city) {
      dispatch(changeErr('Missing City Information!'))
    } else if (!info.state) {
      dispatch(changeErr('Missing State Information!'))
    } else if (!info['shipping zip code']) {
      dispatch(changeErr('Missing Shipping Zip Code!'))
    } else if (!info.phone) {
      dispatch(changeErr('Missing Phone Number!'))
    } else if (info['shipping zip code'].length !== 5) {
      dispatch(changeErr('Shipping Zip Code should be 5 digits.'))
    } else if (info.phone.length !== 10) {
      dispatch(changeErr('Phone Number should be 10 Digits, Numbers Only.'))
    } else {
      dispatch(changeStep('F3'))
    }
  }
}

var showSum = (e) => {
  e.preventDetaul();
  return (dispatch, getState) => {
    let info = getState().info;
    if (!info.username) {
      dispatch(changeErr('Missing Username!'))
    } else if (!info.email) {
      dispatch(changeErr('Missing Email!'))
    } else if (!info.password) {
      dispatch(changeErr('Missing Password!'))
    } else if (info.username.length < 5) {
      dispatch(changeErr('Username should be 5 characters or longer.'))
    } else if (!info.email.includes('@')) {
      dispatch(changeErr('Invalid Email Address!'))
    } else if (info.password.length < 6) {
      dispatch(changeErr('Password should be 6 characters or longer.'))
    } else if (!info.address1) {
      dispatch(changeErr('Missing Address!'))
    } else if (!info.city) {
      dispatch(changeErr('Missing City Information!'))
    } else if (!info.state) {
      dispatch(changeErr('Missing State Information!'))
    } else if (!info['shipping zip code']) {
      dispatch(changeErr('Missing Shipping Zip Code!'))
    } else if (!info.phone) {
      dispatch(changeErr('Missing Phone Number!'))
    } else if (info['shipping zip code'].length !== 5) {
      dispatch(changeErr('Shipping Zip Code should be 5 digits.'))
    } else if (info.phone.length !== 10) {
      dispatch(changeErr('Phone Number should be 10 Digits, Numbers Only.'))
    } else if (!info['credit card number']) {
      dispatch(changeErr('Missing Credit Card Number!'))
    } else if (!info['expiration date']) {
      dispatch(changeErr('Missing Expiration Date!'))
    } else if (!info.cvv) {
      dispatch(changeErr('Missing CVV!'))
    } else if (!info['billing zip code']) {
      dispatch(changeErr('Missing Billing Zip Code!'))
    } else if (info['credit card number'].length < 15 || info['credit card number'].length > 16) {
      dispatch(changeErr('Credit Card Number should be 15 or 16 Digits'))
    } else if (info['expiration date'].length !== 4) {
      dispatch(changeErr('Expiration Data should be 4 digits, e.g. 0621'))
    } else if (info.cvv.length !== 3) {
      dispatch(changeErr('CVV should be 3 digits'))
    } else if (info['billing zip code'].length !== 5) {
      dispatch(changeErr('Billing Zip Code should be 5 digits'))
    } else {
      dispatch(changeStep('Sum'))
    }
  }
}

var showSumEdit = (e) => {
  e.preventDetaul();
  return (dispatch) => {
    dispatch(changeStep('SumEdit'));
  }
}

var showThankYou = (e) => {
  e.preventDetaul();
  var infoDefault = {
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

  return (dispatch, getState) => {
    let state = getState();
    sendData({
      id: state.id,
      info: state.info
    })
    dispatch(changeStep('ThankYou'));
    dispatch(changeInfo(infoDefault));
    dispatch(changeId(state.id+1));
  }
}

///////////////////////////REDUCERS////////////////////////////
var changeStepReducer = (state = 'Home', action) => {
  switch(action.type) {
    case 'step':
      return action.step
    default:
      return state
  }
}

var changeErrReducer = (state = '', action) => {
  switch(action.type) {
    case 'err':
      return action.err
    default:
      return state
  }
}

var changeIdReducer = (state = 0, action) => {
  switch(action.type) {
    case 'id':
      return action.id
    default:
      return state
  }
}

var changeInfoReducer = (action) => {
  switch(action.type) {
    case 'info':
      return action.info
    default:
      return {
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

/////////////////////ROOT REDUCERS//////////////////////////////
var rootReducer = combineReducers({
  changeStep: changeStepReducer,
  changeErr: changeErrReducer,
  changeId: changeIdReducer,
  changeInfo: changeInfoReducer
})

//////////////////////////STORE/////////////////////////////////
const store = createStore(
  roodReducer,
  applyMiddleware(thunk)
)

/////////////////////////CONTAINERS/////////////////////////////
/////////HOME///////////
const mapDispatchToPropsHome = (dispatch) => {
  return {
    showF1: (e) => {
      dispatch(showF1(e))
    }
  }
}
var HomeContainer = connect(null, mapDispatchToPropsHome)(Home)

////////////F1//////////////
const mapStateToPropsF1 = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsF1 = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF2: (e) => {
      dispatch(showF2(e))
    },
    showHome: (e) => {
      dispatch(showHome(e))
    }
  }
}
var F1Container = connect(mapStateToPropsF1, mapDispatchToPropsF1)(F1)

//////////F2/////////////
const mapStateToPropsF2 = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsF2 = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF1: (e) => {
      dispatch(showF1(e))
    },
    showF3: (e) => {
      dispatch(showF3(e))
    }
  }
}
var F2Container = connect(mapStateToPropsF2, mapDispatchToPropsF2)(F2)

//////////F3/////////////
const mapStateToPropsF3 = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsF3 = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF2: (e) => {
      dispatch(showF2(e))
    },
    showSum: (e) => {
      dispatch(showSum(e))
    }
  }
}
var F3Container = connect(mapStateToPropsF3, mapDispatchToPropsF3)(F3)

//////////Sum/////////////
const mapStateToPropsSum = (state) => {
  return {
    info: state.changeInfo
  }
}
const mapDispatchToPropsSum = (dispatch) => {
  return {
    showSumEdit: (e) => {
      dispatch(showSumEdit(e))
    },
    showThankYou: (e) => {
      dispatch(showThankYou(e))
    }
  }
}
var SumContainer = connect(mapStateToPropsSum, mapDispatchToPropsSum)(Sum)

//////////SUMEDIT/////////////
const mapStateToPropsSumEdit = (state) => {
  return {
    err: state.changeErr,
    info: state.changeInfo
  }
}
const mapDispatchToPropsSumEdit = (dispatch) => {
  return {
    getInfo: (id, value) => {
      dispatch(getInfo(id, value))
    },
    showF2: (e) => {
      dispatch(showF2(e))
    },
    showSum: (e) => {
      dispatch(showSum(e))
    }
  }
}
var SumEditContainer = connect(mapStateToPropsSumEdit, mapDispatchToPropsSumEdit)(SumEdit)

//////////THANKYOU/////////////
const mapDispatchToPropsThankYou = (dispatch) => {
  return {
    showHome: (e) => {
      dispatch(showHome(e))
    }
  }
}
var ThankYouContainer = connect(null, mapDispatchToPropsThankYou)(ThankYou)
/***************************REACT*******************************/

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
    <br/><br/>
    <div>{ props.err }</div>
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
      err: '',
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
    var storageInfo = JSON.parse(this.props.myStorage.info);
    var info = this.state.info
    for (var key in storageInfo) {
      info[key] = storageInfo[key]
    }

    this.setState({
      info: info,
      step: this.props.myStorage.step
    })

    this.props.getId()
      .then((lastId) => {
        this.setState({
          id: parseInt(lastId)+1,
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

    this.props.myStorage.setItem('step', 'F1');
    this.props.myStorage.setItem('info', JSON.stringify(this.state.info));
  }

  showF2(e) {
    var info = this.state.info;
    e.preventDefault();

    if (!info.username) {
      this.setState({
        err: 'Missing Username!'
      })
    } else if (!info.email) {
      this.setState({
        err: 'Missing Email!'
      })
    } else if (!info.password) {
      this.setState({
        err: 'Missing Password!'
      })
    } else if (info.username.length < 5) {
      this.setState({
        err: 'Username should be 5 characters or longer.'
      })
    } else if (!info.email.includes('@')) {
      this.setState({
        err: 'Invalid Email Address!'
      })
    } else if (info.password.length < 6) {
      this.setState({
        err: 'Password should be 6 characters or longer.'
      })
    } else {
      this.setState({
        step: 'F2',
        err: ''
      })
      this.props.myStorage.setItem('step', 'F2');
      this.props.myStorage.setItem('info', JSON.stringify(this.state.info));
    }
  }

  showF3(e) {
    var info = this.state.info;
    e.preventDefault();

    if (!info.address1) {
      this.setState({
        err: 'Missing Address!'
      })
    } else if (!info.city) {
      this.setState({
        err: 'Missing City Information!'
      })
    } else if (!info.state) {
      this.setState({
        err: 'Missing State Information!'
      })
    } else if (!info['shipping zip code']) {
      this.setState({
        err: 'Missing Shipping Zip Code!'
      })
    } else if (!info.phone) {
      this.setState({
        err: 'Missing Phone Number!'
      })
    } else if (info['shipping zip code'].length !== 5) {
      this.setState({
        err: 'Shipping Zip Code should be 5 digits.'
      })
    } else if (info.phone.length !== 10) {
      this.setState({
        err: 'Phone Number should be 10 Digits, Numbers Only.'
      })
    } else {
      this.setState({
        step: 'F3',
        err: ''
      })
      this.props.myStorage.setItem('step', 'F3');
      this.props.myStorage.setItem('info', JSON.stringify(this.state.info));
    }
  }

  showSum(e) {
    var info = this.state.info
    e.preventDefault();

    if (!info.username) {
      this.setState({
        err: 'Missing Username!'
      })
    } else if (!info.email) {
      this.setState({
        err: 'Missing Email!'
      })
    } else if (!info.password) {
      this.setState({
        err: 'Missing Password!'
      })
    } else if (info.username.length < 5) {
      this.setState({
        err: 'Username should be 5 characters or longer.'
      })
    } else if (!info.email.includes('@')) {
      this.setState({
        err: 'Invalid Email Address!'
      })
    } else if (info.password.length < 6) {
      this.setState({
        err: 'Password should be 6 characters or longer.'
      })
    } else if (!info.address1) {
      this.setState({
        err: 'Missing Address!'
      })
    } else if (!info.city) {
      this.setState({
        err: 'Missing City Information!'
      })
    } else if (!info.state) {
      this.setState({
        err: 'Missing State Information!'
      })
    } else if (!info['shipping zip code']) {
      this.setState({
        err: 'Missing Shipping Zip Code!'
      })
    } else if (!info.phone) {
      this.setState({
        err: 'Missing Phone Number!'
      })
    } else if (info['shipping zip code'].length !== 5) {
      this.setState({
        err: 'Shipping Zip Code should be 5 digits.'
      })
    } else if (info.phone.length !== 10) {
      this.setState({
        err: 'Phone Number should be 10 Digits, Numbers Only.'
      })
    } else if (!info['credit card number']) {
      this.setState({
        err: 'Missing Credit Card Number!'
      })
    } else if (!info['expiration date']) {
      this.setState({
        err: 'Missing Expiration Date!'
      })
    } else if (!info.cvv) {
      this.setState({
        err: 'Missing CVV!'
      })
    } else if (!info['billing zip code']) {
      this.setState({
        err: 'Missing Billing Zip Code!'
      })
    } else if (info['credit card number'].length < 15 || info['credit card number'].length > 16) {
      this.setState({
        err: 'Credit Card Number should be 15 or 16 Digits'
      })
    } else if (info['expiration date'].length !== 4) {
      this.setState({
        err: 'Expiration Data should be 4 digits, e.g. 0621'
      })
    } else if (info.cvv.length !== 3) {
      this.setState({
        err: 'CVV should be 3 digits'
      })
    } else if (info['billing zip code'].length !== 5) {
      this.setState({
        err: 'Billing Zip Code should be 5 digits'
      })
    } else {
      this.setState({
        step: 'Sum',
        err: ''
      })
      this.props.myStorage.setItem('step', 'Sum');
      this.props.myStorage.setItem('info', JSON.stringify(this.state.info));
    }
  }

  showSumEdit(e) {
    e.preventDefault();

    this.setState({
      step: 'SumEdit'
    })

    this.props.myStorage.setItem('step', 'SumEdit');
    this.props.myStorage.setItem('info', JSON.stringify(this.state.info));
  }

  showThankYou(e) {
    e.preventDefault();

    var infoDefault = {
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

    this.props.sendData({
      id: this.state.id,
      info: this.state.info
    })
    this.setState({
      id: this.state.id+1,
      step: 'ThankYou',
      info: infoDefault
    })

    console.log('infoDefault line 428')
    console.log(infoDefault)

    this.props.myStorage.setItem('step', 'Home');
    this.props.myStorage.setItem('info', JSON.stringify(infoDefault));

  }

  showHome(e) {
    e.preventDefault();

    this.setState({
      step: 'Home'
    })

    this.props.myStorage.setItem('step', 'Home');
    this.props.myStorage.setItem('info', JSON.stringify(this.state.info));
  }

  render() {
    const step = this.state.step;
    let page;

    //conditional rendering child components depending on checkout step
    switch(step) {
      case 'Home':
        page = <Home showF1 = {this.showF1} />
        console.log(this.state)
        console.log(this.props.myStorage);
        break;
      case 'F1':
        page = <F1 err = {this.state.err} showF2 = {this.showF2} getInfo = {this.getInfo} info = {this.state.info} showHome = {this.showHome} />
        console.log(this.state)
        console.log(this.props.myStorage);
        break;
      case 'F2':
        page = <F2 err = {this.state.err} showF3 = {this.showF3} getInfo = {this.getInfo} info = {this.state.info} showF1 = {this.showF1}/>
        console.log(this.state)
        console.log(this.props.myStorage);
        break;
      case 'F3':
        page = <F3 err = {this.state.err} showSum = {this.showSum} getInfo = {this.getInfo} info = {this.state.info} showF2 = {this.showF2} />
        console.log(this.state)
        console.log(this.props.myStorage);
        break;
      case 'Sum':
        page = <Sum showThankYou = {this.showThankYou} info = {this.state.info} showSumEdit = {this.showSumEdit} />
        console.log(this.state);
        console.log(this.props.myStorage);
        break;
      case 'SumEdit':
        page = <SumEdit err = {this.state.err} showSum = {this.showSum} getInfo = {this.getInfo} info= {this.state.info} />
        console.log(this.state);
        console.log(this.props.myStorage);
        break;
      case 'ThankYou':
        page = <ThankYou showHome = {this.showHome} />
        console.log(this.state);
        console.log(this.props.myStorage);
        break;
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

//***************************CLIENT*******************************/
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

//***************************DOM*******************************/
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('app')
);