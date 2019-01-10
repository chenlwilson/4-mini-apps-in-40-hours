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

  if (!info.address1) {
    model.cryptPW(info.password, (hash) => {
      info.password = hash;
      model.createAccount(id, info, () => {
        res.send('success: created account in DB!')
      });
    })
  } else if (!info.cc) {
    model.addShipping(id, info, () => {
      res.send('success: created shipping data!')
    });
  } else {
    model.addBilling(id, info, () => {
      res.send('success: created billing data!')
    });
  }
});

app.get('/checkout', (req, res) => {
  model.getLastId((lastId) => {
    res.send(lastId);
  })
});

//////////////////////MODEL/////////////////////////////////////
var bcrypt = require('bcrypt-nodejs')

var model = {
  createAccount: (id, info, callback) => {
    var sqlStr = 'INSERT INTO purchase (ID, username, email, pw) VALUES (?, ?, ?, ?)';
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

  addShipping: (id, info, callback) => {
    var sqlStr = 'UPDATE purchase SET address1 = ?, address2 = ?, city = ?, state = ?, shipzip = ?, phone = ? WHERE ID = ?';
    var sqlArgs = [info.address1, info.address2, info.city, info.state, info.shipzip, info.phone, id];

    db.query(sqlStr, sqlArgs, (err, results) => {
      if (err) {
        console.log('error adding shipping data: ' + err);
      } else {
        console.log('added shipping data results: ');
        console.log(results);
        callback()
      }
    })
  },

  addBilling: (id, info, callback) => {
    var sqlStr = 'UPDATE purchase SET cc = ?, exp = ?, cvv = ?, billzip = ? WHERE ID = ?';
    var sqlArgs = [info.cc, info.exp, info.cvv, info.billzip, id];

    db.query(sqlStr, sqlArgs, (err, results) => {
      if (err) {
        console.log('error adding billing data: ' + err);
      } else {
        console.log('added billing data results: ');
        console.log(results);
        callback()
      }
    })
  },

  getLastId: (callback) => {
    db.query('SELECT * FROM purchase', (err, results) => {
      if (err) {
        console.log('error query purchase table: ' + err);
      } else {
        console.log('last ID is: ' + results[results.length-1].ID);
        callback(results[results.length-1].ID.toString());
      }
    });
  },

  cryptPW: (password, callback) => {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        console.log('cryptPW err: ' + err);
      } else {
        console.log('cryptPW success: ' + hash);
        callback(hash);
      }
    })
  }
}

//connection.end();

