var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

app.listen(port);
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/checkout', (req, res) => {
  var id = req.body.id;
  var info = req.body.info
  console.log(id);
  console.log(info);

  res.send('received data!')
});

/////////////////////////DATABASE///////////////////////////
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkout'
})

connection.connect();

connection.query('select * FROM purchase', (err, res) => {
  if (err) {
    console.log('error query checkout: ' + err);
  } else {
    console.log('the results are: ');
    console.log(res[0]);
  }
});

connection.end();

