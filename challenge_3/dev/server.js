////////////////////////SERVER//////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

app.listen(port);
app.use(express.static('client/dist'));
app.use(bodyParser.json());

/////////////////////////Setup SQLite3 DATABASE///////////////////////////
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./checkout.sqlite', (err) => {
  if (err) {
    console.log('sqlite3 databse connection error: ' + err.message)
  } else {
    console.log('Connected to the checkout.sqlite database.')
  }
});

db.close((err) => {
  if (err) {
    console.log('sqlite3 databse close error: ' + err.message)
  } else {
    console.log('Closed the database connection.')
  }
});

//////////////////////Setup Sequelize/SQLite3 Connection/////////////////////////
const Sequelize = require('sequelize');
const sequelize = new Sequelize('checkout', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './checkout.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

////////////////////Create Table//////////////////////////////////////////////
const Purchase = sequelize.define('purchase', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  pw: {
    type: Sequelize.STRING
  },
  address1: {
    type: Sequelize.STRING
  },
  address2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  shipzip: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  cc: {
    type: Sequelize.STRING
  },
  exp: {
    type: Sequelize.STRING
  },
  cvv: {
    type: Sequelize.STRING
  },
  billzip: {
    type: Sequelize.STRING
  }
});

//////////////////////CONTROLLER/////////////////////////////////////////
app.post('/checkout', (req, res) => {
  var id = req.body.id;
  var info = req.body.info

  model.cryptPW(info.password, (hash) => {
    info.password = hash;
    model.createEntry(id, info, () => {
      res.send('success: created account in DB!')
    });
  })
});

app.get('/checkout', (req, res) => {
  console.log('server.js line 53')
  model.getLastId((lastId) => {
    res.send(lastId);
  })
});

//////////////////////MODEL/////////////////////////////////////////////////
var bcrypt = require('bcrypt-nodejs')

var model = {
  createEntry: (id, info, callback) => {
    Purchase.sync().then(() => {
      return Purchase.create({
        id: id,
        username: info.username,
        email: info.email,
        pw: info.password,
        address1: info.address1,
        address2: info.address2,
        city: info.city,
        state: info.state,
        shipzip: info['shipping zip code'],
        phone: info.phone,
        cc: info['credit card number'],
        exp: info['expiration date'],
        cvv: info.cvv,
        billzip: info['billing zip code']
      });
     })
     .catch( err => console.log('error insert data into purchase table: ' + err))
     .then( () => callback())
  },

  getLastId: (callback) => {
    Purchase.findAll().then(purchases => {
      console.log(purchases[purchases.length-1].dataValues);
      return callback(purchases[purchases.length-1].dataValues.id.toString());
    })
    .catch(err => console.log('error query purchase table: ' + err ))
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

