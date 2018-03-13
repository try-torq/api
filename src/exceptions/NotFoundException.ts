import { Exception } from './Exception';

export class NotFoundException extends Exception {
  constructor(model?: string) {
    const str = typeof model === 'undefined'
      ? 'route not found'
      : `${model} not found`;
    super(str);
  }

  public static Name = 'Not Found Exception';
  public static status = 404;
}
