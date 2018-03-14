import * as winston from 'winston';

import { Environment } from '../core';

winston.level = 'debug';

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      timestamp: Environment.isProduction,
      handleExceptions: Environment.isProduction,
      json: Environment.isProduction,
      colorize: !Environment.isProduction
    })
  ]
})

class ScopedLogger {
  constructor(private scope: string) { }

  private _logAtLevel(level: string, message: string, ...args: any[]): void {
    if (Environment.config.logger.console.levels.has(level))
      logger[level](
        `[${this.scope}] ${message}`,
        this._parseArgs(...args)
      );
  }

  private _parseArgs(...args: any[]): string | any[] {
    return args.length > 0 ? args : '';
  }

  public debug(message: string, ...args: any[]): void {
    this._logAtLevel('debug', message, ...args);
  }

  public info(message: string, ...args: any[]): void {
    this._logAtLevel('info', message, ...args);
  }

  public warn(message: string, ...args: any[]): void {
    this._logAtLevel('warn', message, ...args);
  }

  public error(message: string, ...args: any[]): void {
    this._logAtLevel('error', message, ...args);
  }
}

export const responseStream = {
  logger: new ScopedLogger('app:response'),
  write(message: string) {
    this.logger.info(message.trim());
  }
}

export const Logger = (scope: string): ScopedLogger => {
  return new ScopedLogger(scope);
}
