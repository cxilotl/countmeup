var express = require('express'),
    bodyParser = require('body-parser'),
    VoterFileSystem = require('./helpers/voterFileSystem');

var server = express();
var port = process.env.PORT || 3000;

server.use( bodyParser.json() );
server.use( bodyParser.urlencoded({ extended: true }) );

var voterFileSystem = new VoterFileSystem();

var voteRouter = require('./routes/voteRoutes')( voterFileSystem );
server.use('/api/votes', voteRouter);


server.get('/', function(req, res) {
    res.send('Welcome to The Count Me Up app');
})

server.listen(port, function() {
   console.log("Running Count Me Up server on PORT: " + port);
});

module.exports = server;