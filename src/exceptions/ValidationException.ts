import { Exception } from './Exception';

export class ValidationException extends Exception {
  public static Name = 'Validation Exception';
  public static status = 400;
}
