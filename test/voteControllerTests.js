var should = require('should'),
    sinon = require('sinon');

var candidates = require('../data/candidates.json');
var voters = require('../data/voters.json');
var VoteController = require('../controllers/voteController');

describe('Given a vote from a Count Me Up user, the controller', function() {

    var voteController, candidateList,
        req, res;

    beforeEach(function() {
        res = {
            status  : sinon.spy(),
            send    : sinon.spy()
        };

    });

    afterEach(function(done) {
        done();
    });

    it('Should return a 400 error when no voter nor candidate info was submitted', function() {

        req = {};

        voteController = new VoteController();

        // Test
        voteController.postVote(req, res);

        res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);

    });

    xit('Should allow registering the vote when the voter is placing a vote for the first time', function() {

        // TODO: To mock the VoterFileSystem and data

        req = {
            body: {
                voterId     : 1,
                candidateId : 1
            }
        };

        voteController = new VoteController();

        // Test
        voteController.postVote(req, res);

        res.status.calledWith(200).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
        res.send.calledWith('Title is required').should.equal(true);

    });

});