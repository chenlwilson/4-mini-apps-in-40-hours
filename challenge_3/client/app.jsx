class App extends React.Component {
  constructor(props) {
    super(props);

    this.showF1 = this.showF1.bind(this);
    this.state = {
      step: 'Home'
    }
  }

  showF1() {
    this.setState({
      step: 'F1'
    })
    console.log('hi');
  }

  render() {
    const step = this.state.step;
    let page;

    if (step === 'Home') {
      page = <Home showF1 = {this.showF1}/>
    } else if (step === 'F1') {
      page = <F1 />
    }
    return (
      <div>
      {page}
      </div>
    )
  }
}

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

var F1 = () => (
  <div>
    <fieldset>
      <legend>Create Account</legend>
      <label>Name: <br />
        <input type='text' name='username' />
      </label><br />
    </fieldset>
    <br/>
  <button>next</button>
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

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