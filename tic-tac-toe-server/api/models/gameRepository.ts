import * as fs from 'fs';
import * as path from 'path';
import * as debugFactory from 'debug';
import { Game } from './game';

let debug = debugFactory('skyux-tic-tac-toe');

export class GameRepository {
  private games: Game[] = [];

  constructor() {
    let dataPath = path.join(__dirname, '../data/games.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        return debug(err);
      }
      this.games = JSON.parse(data);
    });
  }

  list(): Game[] {
    return this.games;
  }
}
