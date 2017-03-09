import { Component, Input } from '@angular/core';

import { GamesService, GameModel } from '../shared/games.service';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  providers: [ GamesService ]
})
export class GameBoardComponent {
  @Input()
  public game: GameModel;

  constructor(private service: GamesService) {}

  public handleClick(rowIndex: number, columnIndex: number) {
    this.service
      .move(this.game.id, rowIndex, columnIndex)
      .subscribe(game => {
        this.game.board = game.board;
        this.game.completed = game.completed;
      });
  }
}
