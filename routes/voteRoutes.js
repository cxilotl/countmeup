var express = require('express');

var routes = function(voterFileSystem) {

    var VoteController = require('../controllers/voteController');
    var voteRouter = express.Router();

    var voteController = new VoteController(voterFileSystem);

    voteRouter.route('/')
        .post( voteController.postVote );

    return voteRouter;
};

module.exports = routes;