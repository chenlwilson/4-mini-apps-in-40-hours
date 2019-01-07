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

app.post('/convert', function(req, res) {
  console.log(req.body);
  if(verifyJSON(req.body) === false) {
    //res.end(compiled({csvResult: 'THIS IS NOT A JSON FILE'}));
    res.end('THIS IS NOT A JSON FILE');
  } else {
    var jsonData = JSON.parse(req.body);
    //res.end(compiled({csvResult: convertHeader(jsonData) + convertContent(jsonData)}));
    res.end(convertHeader(jsonData) + convertContent(jsonData));
  }
});

var verifyJSON = function(data) {
  try {
    JSON.parse(data);
  } catch(e) {
    return false;
  }
}

var convertHeader = function(formData) {
  var header = '';
  var cols = Object.keys(formData).filter(function(col) {
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

var convertContent = function(formData) {
  var csv = '';
  var cols = Object.keys(formData).filter(function(col) {
    return col !== 'children';
  });

  for (var i = 0; i < cols.length; i++) {
    if (i !== cols.length - 1) {
      csv = csv + formData[cols[i]] + ',';
    } else {
      csv = csv + formData[cols[i]] + '\n';
    }
  }
  if (formData.children.length !== 0) {
    for (var i = 0; i < formData.children.length; i++) {
      csv += convertContent(formData.children[i]);
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
