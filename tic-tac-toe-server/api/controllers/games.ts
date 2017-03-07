import * as express from 'express';
import { SwaggerRequest } from './swaggerInterop';
import { GameRepository } from '../models/gameRepository';

let repo = new GameRepository();

export function list(req: express.Request, res: express.Response) : void {
  res.json({ games: repo.list() });
};

export function create(req: SwaggerRequest, res: express.Response) : void {
  let command = req.swagger.params.gameRequest.value;
  let game = repo.create(command.humanPlayerFirst);
  res.status(201).json(game);
};

export function details(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  let game = repo.find(gameId);
  if (!game) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(game);
  }
};

export function update(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  let command = req.swagger.params.move.value;
  let { columnIndex, rowIndex } = command;

  let game = repo.play(gameId, columnIndex, rowIndex);

  if (game) {
    res.json(game);
  } else if (game === false) {
    res.status(409).json({ message: 'Move not allowed' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

export function remove(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  repo.destroy(gameId);
  res.json();
};
