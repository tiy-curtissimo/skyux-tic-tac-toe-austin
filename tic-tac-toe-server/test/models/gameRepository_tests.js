let should = require('should');
let GameRepository = require('../../api/models/gameRepository').GameRepository;
let Game = require('../../api/models/game').Game;
let path = require('path');
let fs = require('fs');

describe("GameRepository", () => {
    it("should return an empty list when new", () => {
        let repo = new GameRepository();

        let result = repo.list();

        result.should.be.Array;
        result.should.have.lengthOf(0);
    });

    it("should create a game with a human as first player", () => {
        let repo = new GameRepository();
        let now = new Date();

        let newGame = repo.addGame(true);

        newGame.id.should.be.ok();
        newGame.startedOn.valueOf().should.be.greaterThanOrEqual(now.valueOf());
        newGame.board.should.be.Array;
        newGame.humanPlayerFirst.should.be.true();
        should(newGame.completed).be.undefined();
    });

    it("should create a game with a human as the second player", () => {
        let repo = new GameRepository();
        let now = new Date();

        let newGame = repo.addGame(false);

        newGame.id.should.be.ok();
        newGame.startedOn.valueOf().should.be.greaterThanOrEqual(now.valueOf());
        newGame.board.should.be.Array;
        newGame.humanPlayerFirst.should.be.false();
        should(newGame.completed).be.undefined();
    });

    it("should load saved games from the file system", done => {
        let data = [
            new Game(1, true),
            new Game(2, false)
        ];
        let dataPath = path.join(__dirname, 'games.dat');
        fs.writeFileSync(dataPath, JSON.stringify(data), 'utf8');

        let repo = new GameRepository();
        repo
            .load(dataPath)
            .then(() => {
                let games = repo.list();
                games.should.deepEqual(data);
                done();
        })
        .catch(err => {
            done(err);
        });
    });
});
