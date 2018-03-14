import * as Express from 'express';

import { NotFoundException } from '../exceptions';

export const notFoundMiddleware = (
  request: Express.Request,
  response: Express.Response,
  next: Express.NextFunction
) => {
  next(new NotFoundException())
}
