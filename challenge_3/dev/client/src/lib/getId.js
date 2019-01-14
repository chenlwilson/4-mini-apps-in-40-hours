//client get request

var getId = () => {

  console.log('getId.js loaded!')

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

export default getId;