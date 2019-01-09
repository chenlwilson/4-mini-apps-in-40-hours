class App extends React.Component {
  constructor(props) {
    super(props);

    this.showF1 = this.showF1.bind(this);
    this.state = {
      name: ''
    }
  }

  showF1() {
    console.log('hi');
  }

  render() {
    return (
      <Checkout showF1 = {this.showF1}/>
    )
  }
}

var Checkout = (props) => (
  <button onClick={() => { props.showF1() }}>checkout</button>
);

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