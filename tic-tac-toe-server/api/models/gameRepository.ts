import * as fs from 'fs';
import * as path from 'path';
import * as debugFactory from 'debug';
import { Game } from './game';

let debug = debugFactory('skyux-tic-tac-toe');

export class GameRepository {
  private games: Game[];
  private dataPath: string;

  constructor(gamesPath: string = '../data/games.json') {
    this.games = [];
    this.dataPath = path.join(__dirname, gamesPath);
    if (path.isAbsolute(gamesPath)) {
      this.dataPath = gamesPath;
    }
    fs.readFile(this.dataPath, 'utf8', (err, data) => {
      if (err) {
        return debug(err);
      }
      this.games = JSON.parse(data).map(x => Game.fromState(x));
    });
  }

  list(): Game[] {
    return this.games;
  }

  create(humanPlayerFirst: boolean): Game {
    let newId = Math.floor(Math.random() * 1000000);
    let game = new Game(newId, humanPlayerFirst);
    return this.addGame(game);
  }

  find(id: number): Game {
    return this.games.find(g => g.id === id);
  }

  play(id: number, columnIndex: number, rowIndex: number): Game | boolean {
    let game = this.find(id);
    if (!game) {
      return null;
    }
    if (game.play(columnIndex, rowIndex)) {
      return game;
    }
    return false;
  }

  destroy(id: number): void {
    let index = this.games.findIndex(g => g.id === id);
    if (index > -1) {
      this.games.splice(index, 1);
    }
  }

  private addGame(game: Game): Game {
    this.games.push(game);
    fs.writeFile(this.dataPath, JSON.stringify(this.games), err => {
      debug(err);
    });
    return game;
  }
}
