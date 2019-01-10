var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

app.listen(port);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/checkout', (req, res) => {
  console.log(req.body.id);
  // var reqBody = JSON.parse(req.body);
  // console.log(reqBody);
  res.send('received data!')
});


