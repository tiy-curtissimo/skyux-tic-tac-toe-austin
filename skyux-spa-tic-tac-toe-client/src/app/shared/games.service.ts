import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface CompletedGameReport {
  winnerIndex: number;
}

export interface GameModel {
  id: number;
  humanPlayerFirst: boolean;
  board: number[][];
  startedOn: Date;
  completed?: CompletedGameReport;
}

@Injectable()
export class GamesService {
  constructor(private http: Http) {}

  public createGame(humanPlayerFirst): Observable<GameModel> {
    let payload = { humanPlayerFirst: humanPlayerFirst };
    return this.http
      .post('https://localhost:10010/games', payload)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
console.log("CAUGHT ERROR IN SERVICE");
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    return Observable.throw(errorMessage);
  }
}
