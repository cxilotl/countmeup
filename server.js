var express = require('express');

var server = express();
var port = process.env.PORT || 3000;

server.get('/', function(req, res) {
    res.send('Welcome to my API!');
});

server.listen(port, function() {
   console.log("Running Count Me Up server on PORT: " + port);
});