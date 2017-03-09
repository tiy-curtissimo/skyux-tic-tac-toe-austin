import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService, GameModel } from '../shared/games.service';

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  providers: [ GamesService ]
})
export class GamesListComponent implements OnInit {
  public games: GameModel[];
  public errorMessage: string;
  public selectedGame: GameModel;

  @Output()
  public gameSelected: EventEmitter<GameModel>;

  constructor(private service: GamesService) {
    this.games = [];
    this.gameSelected = new EventEmitter<GameModel>();
  }

  public ngOnInit() {
    this.service.gameAdded
      .subscribe(() => this.getAll());
    this.service.gameRemoved
      .subscribe(() => this.getAll());
    this.getAll();
  }

  private getAll(): void {
    this.service.getAll()
      .subscribe(
        games => this.games = games,
        err => {
          this.errorMessage = err;
          this.games = [];
        }
      );
  }

  private handleClick(game): void {
    this.selectedGame = game;
    this.gameSelected.emit(game);
  }
}
