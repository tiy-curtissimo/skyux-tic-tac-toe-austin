import { Component } from '@angular/core';

import { GamesService } from '../shared/games.service';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  providers: [ GamesService ]
})
export class CreateGameComponent {
  public output: string;
  public alertType: string;

  constructor(private service: GamesService) {}

  private handleClick(humanPlaysFirst: boolean) { // tslint:disable-line
    this.service
      .create(humanPlaysFirst)
      .subscribe(
        game => {
          this.alertType = 'success';
          this.output = 'Game created';
          setTimeout(() => this.output = '', 2000);
        },
        err => {
          this.alertType = 'danger';
          this.output = 'An error occured',
          setTimeout(() => this.output = '', 2000);
        }
      );
  }
}
