import { Component } from '@angular/core';

import { GamesService } from '../shared/games.service';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  providers: [ GamesService ]
})
export class CreateGameComponent {
  public isHumanPlayerFirst: boolean;
  public output: string;

  constructor(private service: GamesService) {
    this.isHumanPlayerFirst = true;
  }

  private handleClick() { // tslint:disable-line
    this.service
      .create(this.isHumanPlayerFirst)
      .subscribe(
        game => {
          this.output = 'Game created';
          setTimeout(() => this.output = '', 2000);
        },
        err => this.output = 'An error occured'
      );
  }
}
