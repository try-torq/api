export const exception = <Exception extends { new (...args: any[]): {} }>(constructor: Exception) => {
  return class extends constructor {
    name = constructor.name;
  };
};

export const IsException = Symbol();

export interface IException {
  error: boolean;
  type: string;
  message: string;
  status: number;
}

export class Exception extends Error {
  public static seperator = ':';
  public static status = 500;
  public static Name = 'UnknownException';

  public toString(): string {
    return `${this.constructor.name}:${this.message}`;
  }

  public toJson(): IException {
    return {
      error: true,
      type: (this as any).Name,
      message: this.message,
      status: (this as any).status,
    };
  }

  public get isPublic(): boolean {
    return (this as any).status !<= 500;
  }

  public static genericInternalServerError(): Exception {
    return new Exception('Something broke ):');
  }

  constructor(...args: any[]) {
    super(args[0]);
    this.name = Exception.Name;
    this.message = args[0];
    this[IsException] = true;
    Error.captureStackTrace(this);
  }
}
