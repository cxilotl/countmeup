var candidates = require('../data/candidates.json');
var voters = require('../data/voters.json');
var candidateVotes = require('../data/candidatevotes.json');

var VoterFileSystem = function() {

    var candidateList = candidates;
    var voterList = voters;
    var votes = candidateVotes;

    var getCandidates = function() {
        return candidateList.candidates;
    };

    var getVoters = function() {
        return voterList.voters;
    };

    var getVotes = function() {
        return votes.candidatevotes;
    };

    var setVote = function(voterId, candidateId) {
        var votesList = getVotes(), candidateItem;
        if (typeof candidateId !== "undefined") {
            candidateItem = votesList.find(function(voteItem) {
                return voteItem.candidateId = candidateId;
            });
            if (candidateItem) {
                candidateItem.voters.push(voterId);
            } else {
                votesList.push({
                    candidateId : candidateId,
                    voters      : [voterId]
                });
            }
        }
    };

    return {
        getCandidates   : getCandidates,
        getVoters       : getVoters,
        getVotes        : getVotes,
        setVote         : setVote
    };

};

module.exports = VoterFileSystem;
