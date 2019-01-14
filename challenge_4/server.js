const express = require('express');

var app = express();
var port = 5000;

app.use(express.static('./client/dist'));
app.listen(port);




