import * as Express from 'express';

import { NotFoundException } from '../exceptions';

export const accessControlMiddleware = (
  request: Express.Request,
  response: Express.Response,
  next: Express.NextFunction
) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authentication, Accept');
  response.header('Access-Control-Allow-Credentials', 'true');
  next()
};
