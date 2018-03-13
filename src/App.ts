import * as express from 'express';
import * as mongoose from 'mongoose';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

import { Exception } from './exceptions';
import { UserService } from './services';
import { GraphQLRoutes } from './routes'
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
      .post('/seed', async (req: express.Request, res: express.Response) => {
        const user = await UserService.create({
          firstname: 'charles',
          lastname: 'kenney',
          username: 'charles01',
          email: 'charles@charles.com',
          password: 'fooobar29',
        });

        res.send(user.toJson());
      });

    GraphQLRoutes.mount(this.express);
    
    Server.run(this.express, Environment.config.server.port);
    this.log.debug('Server was started on environment %s', Environment.$name)
  }
}
