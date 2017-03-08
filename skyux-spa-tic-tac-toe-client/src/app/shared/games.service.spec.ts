import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';

import { GamesService, GameModel } from './games.service';

describe('GamesService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      GamesService
    ]);
    this.gamesService = this.injector.get(GamesService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('#create should call POST /games on service', fakeAsync(() => {
    let result: GameModel;

    this.gamesService
      .createGame(true)
      .subscribe((game: GameModel) => {
        result = game;
      });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ id: 4, humanPlayerFirst: true })
    })));
    tick();

    expect(result.humanPlayerFirst).toBeTruthy();
    expect(result.id).toBe(4);
  }));

  it('#create fails when server is down', fakeAsync(() => {
    let caughtError: String;
    let result: GameModel;

    this.gamesService
      .createGame(true)
      .subscribe(
        (game: GameModel) => result = game,
        (err: String) => caughtError = err
      );

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 404,
      statusText: 'URL Not Found'
    })));
    tick();

    expect(result).toBeUndefined();
    expect(caughtError).toBeDefined();
  }));
});
