import React from 'react';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.toggleRed = this.toggleRed.bind(this);

    this.state = {
      color: 'white'
    }

  }

  toggleRed() {
    this.setState({
      color: 'red'
    })
  }

  render () {

    return (
    <div>
      <table id='board'>
      <tbody>
      <tr>
        <td onClick={ () => this.toggleRed() }><span className={this.state.color}></span></td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        </tr>
        </tbody>
      </table>
    </div>

    )
  }
}

export default App;

