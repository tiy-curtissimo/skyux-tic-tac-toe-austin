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

  it('should play a 1 for a first-move human', function() {
    let game = new gamelib.Game(1, true);
    let result = game.play(0, 0);

    result.should.be.true();
    game.board[0][0].should.be.equal(1);
  });

  it('should play a 2 for a second-move human', function() {
    let game = new gamelib.Game(1, false);

    let result;
    if (game.board[0][0] === 0) {
        result = game.play(0, 0);
        game.board[0][0].should.be.equal(2);
    } else {
        result = game.play(0, 1);
        game.board[0][1].should.be.equal(2);
    }

    result.should.be.true();
  });

  it('should not play in a square already played', function() {
    let game = new gamelib.Game(1, false);
    game.board[0][0] = -1;

    let result = game.play(0, 0);

    result.should.be.false();
    game.board[0][0].should.be.equal(-1);
  });

  it('should have an opponents move on a second-play human after creation', function() {
    let game = new gamelib.Game(1, false);
    let foundOpponentsMove = false;

    for (let i = 0; i < 3 && !foundOpponentsMove; i += 1) {
      for (let j = 0; j < 3 && !foundOpponentsMove; j += 1) {
        if (game.board[i][j] !== 0) {
          foundOpponentsMove = true;
        }
      }
    }

    foundOpponentsMove.should.be.true();
  });

  it('should have an opponents move after a human move', function() {
    let game = new gamelib.Game(1, true);
    game.play(0, 0);
    let foundOpponentsMove = false;

    for (let i = 0; i < 3 && !foundOpponentsMove; i += 1) {
      for (let j = 0; j < 3 && !foundOpponentsMove; j += 1) {
        if (game.board[i][j] === 2) {
          foundOpponentsMove = true;
        }
      }
    }

    foundOpponentsMove.should.be.true();
  });
});
