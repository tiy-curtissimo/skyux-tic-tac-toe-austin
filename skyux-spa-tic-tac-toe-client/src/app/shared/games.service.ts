import { Injectable, Output } from '@angular/core';
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
  constructor(private http: Http) {}

  public create(humanPlayerFirst: boolean): Observable<GameModel> {
    let payload = { humanPlayerFirst: humanPlayerFirst };
    return this.http
      .post('https://localhost:10010/games', payload)
      .map(response => response.json());
  }
}
