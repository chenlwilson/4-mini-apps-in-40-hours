var express = require('express');
var app = express();
var port = 8080;

app.listen(port);
app.use(express.static('public'));



