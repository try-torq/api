import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';

import { Logger } from './Logger';
import { Environment } from './Environment';

require('mongoose').Promise = bluebird.Promise;

const log = Logger('app:core:database');

export class Database {
  private static get uri(): string {
    return Environment.config.database.uri;
  }

  private static onError(error: Error) {
    log.error(`unable to connect to database: ${this.uri}`);
    throw error;
  }

  private static onConnect(): void {
    log.info(`connected to database ${this.uri}`);
  }

  private static onDisconnect(): void {
    log.info(`disconnect from database ${this.uri}`);
  }

  public static async init(): Promise<mongoose.Mongoose> {
    const conn = await mongoose.connect(Environment.config.database.uri);

    mongoose.connection.on('connect', () => this.onConnect());
    mongoose.connection.on('disconnect', () => this.onDisconnect());
    mongoose.connection.on('error', (error) => this.onError(error));

    return conn;
  }
}
