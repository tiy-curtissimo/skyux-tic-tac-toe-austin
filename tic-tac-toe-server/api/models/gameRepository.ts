import {Game} from './game';
import * as fs from 'fs';

export class GameRepository {
    private games: Game[] = [];

    public list(): Game[] {
        return this.games;
    }

    public addGame(humanPlayerFirst: boolean): Game {
        let id = Math.floor(Math.random() * 1000000);
        return new Game(id, humanPlayerFirst);
    }

    public load(dataPath: string): Promise<Game[]> {
        return new Promise((good, bad) => {
            fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    return bad(err);
                }
                let games = JSON.parse(data);
                games.forEach(game => game.startedOn = new Date(game.startedOn));

                this.games = games;
                good(this.games);
            });
        });
    }
}
