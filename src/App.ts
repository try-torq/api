import * as express from 'express';
import * as mongoose from 'mongoose';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

import { authMiddleware } from './middleware';
import { Exception } from './exceptions';
import { UserService } from './services';
import { GraphQLRoutes, RootRoutes } from './routes'
import {
  Database,
  Environment,
  Server,
  Logger,
  responseStream,
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
      .use(authMiddleware)
      .use(morgan('combined', { stream: responseStream }))
      .use(helmet.noCache())
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
