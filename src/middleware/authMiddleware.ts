import * as Express from 'express';
import * as jwt from 'jsonwebtoken';

import { AuthRole, IUserClaims } from '../context/UserContext'

export const authMiddleware = (
  request: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  let payload;
  let authStatus;
  try {
    const token = request.get('Authorization').split('Bearer').pop().trim();
    payload = <IUserClaims>jwt.decode(token);

    switch (payload.role) {
      case 'mod':
        authStatus = AuthRole.mod;
        break
      case 'admin':
        authStatus = AuthRole.admin;
        break
      default:
        authStatus = AuthRole.user;
    }
  } catch (e) {
    authStatus = AuthRole.none;
  }

  (request as any).authStatus = authStatus;
  (request as any).user = payload;

  next();
};
