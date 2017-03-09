import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

export interface CompletedReport {
  winnerIndex: number;
}

export interface GameModel {
  id: number;
  humanPlayerFirst: boolean;
  board: number[][];
  startedOn: Date;
  completed?: CompletedReport;
};

@Injectable()
export class GamesService {
  private static _gameAdded: EventEmitter<GameModel>;

  constructor(private http: Http) {
    if (!GamesService._gameAdded) {
      GamesService._gameAdded = new EventEmitter<GameModel>();
    }
  }

  @Output()
  public get gameAdded() {
    return GamesService._gameAdded;
  }

  public move(id: number, rowIndex: number, columnIndex: number): Observable<GameModel> {
    let payload = {
      rowIndex: rowIndex,
      columnIndex: columnIndex
    };
    return this.http
      .patch(`https://localhost:10010/games/${id}`, payload)
      .map(response => response.json());
  }

  public getAll(): Observable<GameModel[]> {
    return this.http
      .get('https://localhost:10010/games')
      .map(response => response.json().games)
      .do(games => games.forEach(game => game.startedOn = new Date(game.startedOn)));
  }

  public create(humanPlayerFirst: boolean): Observable<GameModel> {
    let payload = { humanPlayerFirst: humanPlayerFirst };
    return this.http
      .post('https://localhost:10010/games', payload)
      .map(response => response.json())
      .do(game => game.startedOn = new Date(game.startedOn))
      .do(game => GamesService._gameAdded.emit(game));
  }
}
