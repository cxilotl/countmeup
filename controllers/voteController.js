var VoteController = function(voterFileSystem) {

    var postVote = function(req, res) {

        try {
            if (req.body.voterId && req.body.candidateId) {
                console.log('Voter ' + req.body.voterId + ' has voted for candidate ' + req.body.candidateId);
                voterFileSystem.setVote(req.body.voterId, req.body.candidateId);
                res.status(201);
                res.send('Vote entered!');
            } else {
                throw new Error('No vote submitted');
            }

        } catch(err) {
            res.status(400);
            res.send(err.message);
        }

    };

    return {
        postVote: postVote
    };

};

module.exports = VoteController;