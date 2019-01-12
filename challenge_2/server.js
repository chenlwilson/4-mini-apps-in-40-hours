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
//var bodyParser = require('body-parser');
var multer = require('multer');
var _ = require('underscore');
var app = express();
var port = 4000;

app.use(express.static('public'));
//app.use(bodyParser.text());
app.listen(port);

var upload = multer();
var lastData = '';
var uid = 0;
var fileHeader = [];

app.post('/convert', upload.single('fileData'), function(req, res) {
  var data = '';
  var keyword = req.body.keyword;

  if (req.file) {
    data = req.file.buffer.toString();
  } else {
    data = req.body.textArea;
  }

  if(verifyJSON(data) === false) {
    res.end('Can not convert. \n Not a JSON file or does not comply with the data structure');
  } else {
    var jsonData = addFields(JSON.parse(data), ' ', keyword);
    lastData = '';
    lastData += convertHeader(jsonData);
    lastData += convertContent(jsonData);
    uid = 0;
    fileHeader = new Array();
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

var addFields = function(data, parent, keyword) {
  //mark blacklist records by id/parent
  if (keyword) {
    for (var key in data) {
      if (typeof data[key] === 'string' && data[key].includes(keyword)) {
        data.id = 'blacklist';
        data.parent = 'blacklist';
        return data;
      }
    }
  }

  //add empty children array if missing children
  if (!data.children) {
    data.children = new Array();
  }

  //add consec id/parent to the whitelist records
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

var collectHeader = function(data) {
  for (var key in data) {
    if (key !== 'children' && fileHeader.indexOf(key) === -1) {
      fileHeader.push(key);
    }
  }

  if (data.children.length > 0) {
    for (var i = 0; i < data.children.length; i++) {
      collectHeader(data.children[i]);
    }
  }
}

var convertHeader = function(data) {
  collectHeader(data);
  var headerString = fileHeader.join().concat('\n');
  return headerString;
}

var convertContent = function(data) {
  var csv = '';

  //do not convert blacklist records
  if (data.id === 'blacklist') {
    return csv;
  }

  for (var i = 0; i < fileHeader.length; i++) {
    if (i === fileHeader.length - 1) {
      if (typeof data[fileHeader[i]] === 'undefined') {
        csv = csv + ' ' + '\n';
      } else {
        csv = csv + data[fileHeader[i]] + '\n';
      }
    } else if (typeof data[fileHeader[i]] === 'undefined') {
      csv = csv + ' ' + ',';
    } else {
      csv = csv + data[fileHeader[i]] + ',';
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
