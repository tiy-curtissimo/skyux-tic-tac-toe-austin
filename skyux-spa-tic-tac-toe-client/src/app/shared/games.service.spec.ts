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
    let date = new Date(2000, 0, 1);

    // ACT
    this.service
      .create(true)
      .subscribe(
        (game: GameModel) => result = game,
        err => error = err
      );
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        id: 5,
        humanPlayerFirst: true,
        startedOn: date
      })
    })));
    tick(); // BLOCKING!!

    // ASSERT
    expect(this.lastConnection.request.method).toBe(RequestMethod.Post);
    expect(this.lastConnection.request.url).toBe('https://localhost:10010/games');
    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(result.id).toBe(5);
    expect(result.humanPlayerFirst).toBe(true);
    expect(result.startedOn.valueOf()).toBe(date.valueOf());
  }));

  it('#create firest gameAdded output', fakeAsync(() => {
    // ARRANGE
    let result: GameModel;

    // ACT
    this.service
      .gameAdded
      .subscribe((game: GameModel) => result = game);
    this.service
      .create(true)
      .subscribe();
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ id: 5, humanPlayerFirst: true })
    })));
    tick();

    // ASSERT
    expect(result).toBeDefined();
  }));

  it('#getAll(true) calls HTTP GET on my service', fakeAsync(() => {
    // ARRANGE
    let date = new Date(2001, 1, 1);
    let payload = {
      games: [
        { id: 5, humanPlayerFirst: true, startedOn: date }
      ]
    };
    let result: GameModel[];
    let error: any;

    // ACT
    this.service
      .getAll()
      .subscribe(
        (games: GameModel[]) => result = games,
        err => error = err
      );
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(payload)
    })));
    tick(); // BLOCKING!!

    // ASSERT
    expect(this.lastConnection.request.method).toBe(RequestMethod.Get);
    expect(this.lastConnection.request.url).toBe('https://localhost:10010/games');
    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(5);
    expect(result[0].humanPlayerFirst).toBe(true);
    expect(result[0].startedOn.valueOf()).toBe(date.valueOf());
  }));
});
