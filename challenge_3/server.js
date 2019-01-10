////////////////////////SERVER//////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

app.listen(port);
app.use(express.static('public'));
app.use(bodyParser.json());

/////////////////////////DATABASE///////////////////////////
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkout'
})

db.connect();

//////////////////////CONTROLLER/////////////////////////////
app.post('/checkout', (req, res) => {
  var id = req.body.id;
  var info = req.body.info
  console.log(id);
  console.log(info);

  //model.postData(id, info);
  model.getData();

  res.status(200).send('received data!')
});

//////////////////////MODEL/////////////////////////////////////
var model = {
  // postData: (id, info) => {

  // },

  // updateData: (id, info) => {

  // },

  getData: () => {
    db.query('select * FROM purchase', (err, res) => {
      if (err) {
        console.log('error query checkout: ' + err);
      } else {
        console.log('the results are: ');
        console.log(res);
      }
    });
  }
}


//connection.end();

