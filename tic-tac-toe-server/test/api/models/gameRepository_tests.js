let should = require('should');
let path = require('path');
let fs = require('fs');
let gamelib = require('../../../api/models/gameRepository');
let Game = require('../../../api/models/game').Game;

describe('GameRepository', () => {
  let dbpath = path.join(__dirname, 'games.json');

  afterEach(done => {
    fs.unlink(dbpath, () => { done(); });
  })

  it('should initialize correctly when the file does not exist', done => {
    let repo = new gamelib.GameRepository(dbpath);
    repo
      .load()
      .then(() => {
        repo.list().should.deepEqual([]);
        done();
      })
      .catch(done);
  });

  it('should contain the data from the data file', done => {
    let data = [new Game(1, false), new Game(2, true), new Game(3, false)];

    fs.writeFile(dbpath, JSON.stringify(data), err => {
      if (err) {
        return done(err);
      }

      let repo = new gamelib.GameRepository(dbpath);
      repo
        .load()
        .then(() => {
          repo.list().should.deepEqual(data);
          done();
        })
        .catch(done);
    });
  });

  it('should add a new game to the list after create', done => {
    let repo = new gamelib.GameRepository(dbpath);
    repo
      .load()
      .then(() => {
        let newGame = repo.create(true);

        repo.list().should.have.lengthOf(1);
        repo.list()[0].should.be.equal(newGame);
        done();
      })
      .catch(done);
  });

  it('should return a falsey value if it cannot find a game with the given id', () => {
    let repo = new gamelib.GameRepository(dbpath);

    let unfound = repo.find(-2);

    should(unfound).be.not.ok();
  });

  it('should return a game with the specified id', done => {
    let data = [new Game(4, true)];

    fs.writeFile(dbpath, JSON.stringify(data), err => {
      if (err) {
        return done(err);
      }

      let repo = new gamelib.GameRepository(dbpath);
      repo
        .load()
        .then(() => {
          repo.find(4).should.deepEqual(data[0]);
          done();
        })
        .catch(done);
    });
  });

  it('should play the specified move', done => {
    let data = [new Game(9, true)];

    fs.writeFile(dbpath, JSON.stringify(data), err => {
      if (err) {
        return done(err);
      }

      let repo = new gamelib.GameRepository(dbpath);
      repo
        .load()
        .then(() => {
          let game = repo.play(9, 1, 1);

          game.board[1][1].should.be.equal(1);
          done();
        })
        .catch(done);
    });
  });

  it('should remove the indicated game', done => {
    let data = [new Game(1, false), new Game(2, true), new Game(3, false)];

    fs.writeFile(dbpath, JSON.stringify(data), err => {
      if (err) {
        return done(err);
      }

      let repo = new gamelib.GameRepository(dbpath);
      repo
        .load()
        .then(() => {
          repo.destroy(2);

          repo.list().should.have.lengthOf(2);
          repo.list()[0].should.be.deepEqual(data[0]);
          repo.list()[1].should.be.deepEqual(data[2]);
          done();
        })
        .catch(done);
    });
  });
});
