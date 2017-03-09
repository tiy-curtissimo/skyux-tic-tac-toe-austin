import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';

import { GamesService, GameModel } from './games.service';

describe('GamesService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      GamesService
    ]);
    this.service = this.injector.get(GamesService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('#create(true) calls HTTP POST on my service with human player first', fakeAsync(() => {
    // ARRANGE
    let result: GameModel;
    let error: any;

    // ACT
    this.service
      .create(true)
      .subscribe(
        (game: GameModel) => result = game,
        err => error = err
      );
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ id: 5, humanPlayerFirst: true })
    })));
    tick(); // BLOCKING!!

    // ASSERT
    expect(this.lastConnection.request.method).toBe(RequestMethod.Post);
    expect(this.lastConnection.request.url).toBe('https://localhost:10010/games');
    expect(result).toBeDefined();
    expect(error).toBeUndefined();
  }));
});
