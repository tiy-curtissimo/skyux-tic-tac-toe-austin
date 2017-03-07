import * as express from 'express';

export interface ParamsHolder {
  params: any;
}

export interface SwaggerRequest extends express.Request {
  swagger: ParamsHolder;
}
