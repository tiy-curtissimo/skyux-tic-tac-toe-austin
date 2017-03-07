import * as express from 'express';
import { SwaggerRequest } from './swaggerInterop';
import { GameRepository } from '../models/gameRepository';

let repo = new GameRepository();

export function list(req: express.Request, res: express.Response) : void {
  res.json({ games: repo.list() });
};

export function create(req: SwaggerRequest, res: express.Response) : void {
  let command = req.swagger.params.gameRequest.value;
};

export function details(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
};

export function update(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
  let command = req.swagger.params.move.value;
};

export function remove(req: SwaggerRequest, res: express.Response) : void {
  let gameId = req.swagger.params.id.value;
};
