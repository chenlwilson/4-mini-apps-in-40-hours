console.log('app.js loaded!');

var getFileData = function(e) {
  e.preventDefault();
  var textArea = document.getElementById('text');
  var keyword = document.getElementById('keyword');
  var blacklist = '';
  if (keyword.value) {
    blacklist += keyword.value;
  }
  if (textArea.value) {
    sendFile(textArea.value + '%' + blacklist);
    document.getElementById('form').reset();
  } else {
    var fileInput = document.getElementById('file');
    var file = fileInput.files.item(0);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      sendFile(reader.result + '%' + blacklist);
    }
  }
}

var display = function(data) {
  var result = document.getElementById('result');
  result.innerHTML = '';
  result.append(data);
}

var failMessage = function() {
  var result = document.getElementById('result');
  result.innerHTML = '';
  result.append('Fail to send! :-(');
}

var sendFile = function(file) {
  console.log('hi');

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
      contentType: 'text/plain'
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

