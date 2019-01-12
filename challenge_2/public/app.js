console.log('app.js loaded!');

var getFileData = function(e) {
  e.preventDefault();
  var textArea = document.getElementById('text');
  var fileData = document.getElementById('fileData').files[0];
  var keyword = document.getElementById('keyword');

  var formData = new FormData();
  formData.append('textArea', textArea);
  formData.append('fileData', fileData);
  formData.append('keyword', keyword);

  sendFile(formData);
}

var display = function(data) {
  var result = document.getElementById('result');
  result.innerHTML = '';
  result.append(data);
}

var failMessage = function() {
  var result = document.getElementById('result');
  result.innerHTML = '';
  result.append('Fail to send file!');
}

var sendFile = function(file) {
  console.log('sending file');

  ///////////using ajax/////////
  // $.ajax({
  //   url: '/convert',
  //   type: 'POST',
  //   contentType: 'text/plain',
  //   data: file
  // })
  //   .done(function(data) {
  //     console.log('send file successful!');
  //     display(data);
  //   })
  //   .fail(function() {
  //     console.log('fail to send file!');
  //     failMessage();
  //   })

  ////////using fetch///////////
  return fetch('/convert', {
    method: 'POST',
    mode: 'cors',
    headers: {
      contentType: 'multipart/form-data'
    },
    body: file
  })
    .then(function(data) {
      return data.text();
    })
    .catch(function(err) {
      console.log('fail to send file! error: ' + err);
      failMessage();
    })
    .then(function(text) {
      console.log('send file successful!');
      display(text);
    })
}

var form = document.getElementById('form');
//form.addEventListener('submit', getFormData);
form.addEventListener('submit', getFileData);

