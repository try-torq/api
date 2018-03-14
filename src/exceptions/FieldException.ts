import { Exception } from './Exception';

export class FieldException extends Exception {
  public static Name = 'Field Exception';
  public static status = 500;
}
