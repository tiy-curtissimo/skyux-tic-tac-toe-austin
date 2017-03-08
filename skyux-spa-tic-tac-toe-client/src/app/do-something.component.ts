import { Component } from '@angular/core';
import { GamesService, GameModel } from './shared/games.service';

@Component({
  selector: 'do-something',
  template: '<button (click)="clicky()">Click me</button><pre>{{ output }}</pre>',
  providers: [GamesService]
})
export class DoSomethingComponent {
  output: String;

  constructor(private service: GamesService) {}

  clicky() {
    console.log('HELLO?');

    this.service.createGame(true).subscribe(
      game => this.output = JSON.stringify(game),
      err => this.output = 'ERROR:' + err
    )
  }
}
