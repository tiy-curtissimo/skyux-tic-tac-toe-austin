let should = require('should');
let gamelib = require('../../../api/models/game');

describe('Game', function() {
  it('should initialize correctly', function() {
    let now = new Date();
    let game = new gamelib.Game(1, true);

    game.id.should.equal(1);
    game.humanPlayerFirst.should.be.true();
    game.startedOn.should.be.a.Date;
    game.startedOn.valueOf().should.be.greaterThanOrEqual(now.valueOf());
    game.board.should.be.deepEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    should(game.completed).be.undefined();
  });
});
