var should = require('should'),
    // assert = require('assert'),
    sinon = require('sinon');

var candidates = require('../data/candidates.json');
var voters = require('../data/voters.json');
var candidateVotes = require('../data/candidatevotes.json');
var VoterFileSystem = require('../helpers/voterFileSystem');

describe('Given a list of candidates, voters and votes', function() {

    var voterFileSystem;

    beforeEach(function() {
        voterFileSystem = new VoterFileSystem();
    });

    afterEach(function(done) {
        done();
    });

    it('Should return the list of candidates', function() {

        var candidateList;

        // Test
        candidateList = voterFileSystem.getCandidates();

        candidateList.should.equal(candidates.candidates);

    });

    it('Should return the list of voters', function() {

        var voterList;

        // Test
        voterList = voterFileSystem.getVoters() ;

        voterList.should.equal(voters.voters);

    });

    it('Should return the list of votes', function() {

        var voteList;

        // Test
        voteList = voterFileSystem.getVotes() ;

        voteList.should.equal(candidateVotes.candidatevotes);

    });

});