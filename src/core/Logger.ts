import * as winston from 'winston';
import * as Debug from 'debug';

import { Environment } from './Environment';

process.env.DEBUG = Environment.config.logger.debug;

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: Environment.config.logger.console.level,
      timestamp: Environment.isProduction,
      handleExceptions: Environment.isProduction,
      json: Environment.isProduction,
      colorize: !Environment.isProduction,
    })
  ]
});

const stream = (streamFunction) => ({
  stream: streamFunction
});

const write = (writeFunction) => ({
  write: (message: string) => writeFunction(message)
});

const debug = Debug('app:response');

export const winstonStream = stream(write(logger.info));
export const debugStream = stream(write(debug));

const format = (scope: string, message: string) => `[${scope}] ${message}`;
const parse = (args: any[]) => args.length < 0 ? args : '';

export const Logger = (scope: string) => {
  const scopeDebug = Debug(scope);
  return {
    debug: (message: string, ...args: any[]) => {
      if (Environment.isProduction)
        logger.debug(format(scope, message), parse(args));

      scopeDebug(message, parse(args));
    },
    verbose: (message: string, ...args: any[]) =>
      logger.verbose(format(scope, message), parse(args)),
  
    info: (message: string, ...args: any[]) =>
      logger.info(format(scope, message), parse(args)),
    
    warn: (message: string, ...args: any[]) =>
      logger.warn(format(scope, message), parse(args)),
  
    error: (message: string, ...args: any[]) =>
      logger.error(format(scope, message), parse(args))
  }
};
