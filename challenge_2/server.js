//1. The server must flatten the JSON hierarchy, mapping each item/object
//in the JSON to a single line of CSV report (see included sample output),
//where the keys of the JSON objects will be the columns of the CSV report.

//2. You may assume the JSON data has a regular structure and hierarchy
//(see included sample file). In other words, all sibling records at a particular
//level of the hierarchy will have the same set of properties, but child objects
//might not contain the same properties. In all cases, every property you encounter
//must be present in the final CSV output.

//3. You may also assume that child records in the JSON will always be in a
//property called `children`.

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var port = 4000;

app.use(express.static('public'));
app.use(bodyParser.text());
app.listen(port);

var lastData = '';
var uid = 0;

app.post('/convert', function(req, res) {
  var data = req.body.split('%');
  var dataBody = data[0];
  var keyword = data[1];
  if(verifyJSON(dataBody) === false) {
    //res.end(compiled({csvResult: 'Can not convert. \n Not a JSON file or does not comply with the data structure'}));
    res.end('Can not convert. \n Not a JSON file or does not comply with the data structure');
  } else {
    var jsonData = addFields(JSON.parse(dataBody), ' ', keyword);
    //res.end(compiled({csvResult: convertHeader(jsonData) + convertContent(jsonData)}));
    lastData = '';
    lastData += convertHeader(jsonData);
    lastData += convertContent(jsonData);
    uid = 0;
    res.end(lastData);
  }
});

app.get('/convert', function(req, res) {
  res.end(lastData);
});

var verifyJSON = function(data) {
  try {
    JSON.parse(data);
  } catch(e) {
    return false;
  }
}

var convertHeader = function(data) {
  var header = '';
  var cols = Object.keys(data).filter(function(col) {
    return col !== 'children';
  });

  for (var i = 0; i < cols.length; i++) {
    if (i !== cols.length - 1) {
      header = header + cols[i] + ',';
    } else {
      header = header + cols[i] + '\n';
    }
  }
  return header;
}

var addFields = function(data, parent, keyword) {
  if (keyword) {
    for (var key in data) {
      if (typeof data[key] === 'string' && data[key].includes(keyword)) {
        data.id = 'blacklist';
        data.parent = 'blacklist';
        return data;
      }
    }
  }

  data.id = uid;
  data.parent = parent;
  uid++;

  if (data.children.length > 0) {
    for (var i = 0; i < data.children.length; i++) {
      addFields(data.children[i], data.id, keyword);
    }
  }

  return data;
}

var convertContent = function(data) {
  var csv = '';

  if (data.id === 'blacklist') {
    return csv;
  }

  var cols = Object.keys(data).filter(function(col) {
    return col !== 'children';
  });

  for (var i = 0; i < cols.length; i++) {
    if (i !== cols.length - 1) {
      csv = csv + data[cols[i]] + ',';
    } else {
      csv = csv + data[cols[i]] + '\n';
    }
  }
  if (data.children.length > 0) {
    for (var i = 0; i < data.children.length; i++) {
      csv += convertContent(data.children[i]);
    }
  }
  return csv;
}

// var compiled = _.template(`
//     <body style='text-align:center'>
//     <header>
//       <h1>JSON to CSV</h1>
//     </header>
//       <p>paste JSON file below and submit</p>
//       <form action='/convert'>
//         <textarea style='width:600px;height:300px' name='formData'></textarea>
//         <br/>
//         <input type='submit'>
//       </form>
//       <br/>
//       <div id='result'>Result will display here...</div>
//       <br/>
//       <div style='width:600px'><%= csvResult %></div>
//     <script src='./app.js'></script>
//     </body>
//   `);
