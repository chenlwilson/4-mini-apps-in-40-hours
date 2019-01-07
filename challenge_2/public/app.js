console.log('app.js loaded!');

var getFormData = function(e) {
  e.preventDefault();
  var formData = document.getElementById('text').value;
  console.log(formData);
  sendFile(formData);
}

var display = function(data) {
  var result = document.getElementById('result');
  result.append(data);
}

var sendFile = function(file) {
  console.log('hi');
  $.ajax({
    url: '/convert',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(file)
  })
    .done(function(data) {
      console.log('send file successful!');
      display(data);
    })
    .fail(function() {
      console.log('fail to send file!');
    })
}

var form = document.getElementById('form');
form.addEventListener('submit', getFormData);

