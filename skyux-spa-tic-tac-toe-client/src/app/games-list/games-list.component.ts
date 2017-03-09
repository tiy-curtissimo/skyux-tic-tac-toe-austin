import { Component, OnInit } from '@angular/core';
import { GamesService, GameModel } from '../shared/games.service';

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html',
  providers: [ GamesService ]
})
export class GamesListComponent implements OnInit {
  public games: GameModel[];
  public errorMessage: string;

  constructor(private service: GamesService) {
    this.games = [];
  }

  public ngOnInit() {
    this.service.gameAdded
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
}
