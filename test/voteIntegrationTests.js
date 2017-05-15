var should      = require('should'),
    request     = require('supertest'),
    server      = require('../server'),
    agent = request.agent( server );

describe('Given a count me up voter ', function() {

    describe('When placing a vote for a candidate ', function() {

        describe('And the voter has not voted before, ', function() {

            afterEach(function(done) {
                done();
            });

            xit('it should register that vote and return a 201 response', function(done) {
                var postedVote = {
                    voterId     : 1,
                    candidateId : 1
                };

                agent.post('/api/votes')
                    .send( postedVote )
                    .expect(201)
                    .end( function(err, res) {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    });
            });

        });

    });


});