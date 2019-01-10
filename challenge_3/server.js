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

  model.postData(id, info, () => {
    res.sendStatus(200);
    res.send('received data!')
  });
});

app.get('/checkout', (req, res) => {
  model.getLastId((lastId) => {
    res.send(lastId);
  })
});

//////////////////////MODEL/////////////////////////////////////
var model = {
  postData: (id, info, callback) => {
    var sqlStr = 'INSERT INTO purchase (id, username, email, pw) VALUES (?, ?, ?, ?)';
    var sqlArgs = [id, info.username, info.email, info.password];
    db.query(sqlStr, sqlArgs, (err, results) => {
      if (err) {
        console.log('error insert data into purchase table: ' + err);
      } else {
        console.log('post data results: ');
        console.log(results);
        callback();
      }
    });
  },

  // updateData: (id, info) => {

  // },

  getLastId: (callback) => {
    db.query('SELECT * FROM purchase', (err, results) => {
      if (err) {
        console.log('error query purchase table: ' + err);
      } else {
        console.log('last ID is: ' + results[results.length-1].ID);
        callback(results[results.length-1].ID.toString());
      }
    });
  }
}


//connection.end();

