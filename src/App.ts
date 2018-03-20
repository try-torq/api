import * as express from 'express';
import * as mongoose from 'mongoose';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

import {
  authMiddleware,
  accessControlMiddleware,
  notFoundMiddleware
} from './middleware';
import {
  Database,
  Environment,
  Server,
  Logger,
  responseStream,
} from './core';
import { GraphQLRoutes, RootRoutes } from './routes';

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
      .use(cors({ origin: '*', credentials: true }))
      .use(authMiddleware)
      .use(morgan('combined', { stream: responseStream }))
      .use(helmet.noCache())
      .use(accessControlMiddleware)
      .use(helmet.hsts({
        maxAge: 31536000,
        includeSubdomains: true,
      }));

    RootRoutes.mount(this.express);
    GraphQLRoutes.mount(this.express);
    
    Server.run(this.express, Environment.config.server.port);
    this.log.debug('Server was started on environment %s', Environment.$name)
  }
}
