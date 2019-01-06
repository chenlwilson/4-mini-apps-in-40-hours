var express = require('express');
var app = express();
var port = 3000;

app.listen(port);

app.use(express.static('public'));