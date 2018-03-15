import * as Express from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  request: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  let payload;
  try {
    const token = request.get('Authorization').split('Bearer').pop().trim();
    payload = jwt.verify(token, 'SECRET');
  } catch (e) {/* swallow auth errors */}

  (request as any).user = payload;
  next();
};
