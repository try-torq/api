import { Exception } from './Exception';

export class UnauthorizedException extends Exception {
  public static Name = 'Unauthorized Exception';
  public static status = 401;
}
