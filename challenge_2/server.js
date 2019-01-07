var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
var port = 4000;

app.use(express.static('client'));
//app.use(bodyParser.json());

app.listen(port);

app.get('/convert', function(req, res) {
  console.log(req.query.formData);
  res.end('hi');
})

