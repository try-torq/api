import * as express from 'express';
import * as mongoose from 'mongoose';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

import { Exception } from './exceptions';
// import { Schema } from './schemas';
// import { RootValue } from './RootValue';
import {
  Database,
  Environment,
  Server,
  Logger,
  winstonStream,
  debugStream
} from './core';

export class App {
  public static shared = new App();

  private log = Logger('app:main');
  private mongoose: mongoose.Mongoose;
  private express: express.Application;

  constructor() {
    Database.init().then(db => this.mongoose = db);
    this.express = Server.init();
  }

  public main(): void {
    this.express
      .use(helmet())
      .use(cors())
      .use(morgan('dev', debugStream))
      .use(morgan('combined', winstonStream))
      .use(helmet.noCache())
      .use(helmet.hsts({
        maxAge: 31536000,
        includeSubdomains: true,
      }))
    
    Server.run(this.express, Environment.config.server.port);
    this.log.debug('Server was started on environment %s', Environment.$name)
  }
}