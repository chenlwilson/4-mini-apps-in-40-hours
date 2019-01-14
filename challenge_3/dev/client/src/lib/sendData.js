//using fetch to handle API calls
//client post request

var sendData = (data) => {

  console.log('sendData.js loaded!');
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

export default sendData;