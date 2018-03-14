import * as express from 'express';
import * as GraphQLHTTP from 'express-graphql';

import { Environment, Database } from '../core';
import { Exception, exception } from '../exceptions';
import { Schema } from '../schemas';
import { RootValue } from '../RootValue';
import { Context } from '../context';
import { UserService } from '../services';

export class GraphQLRoutes {
  public static mount(app: express.Application): void {
    app.use('/graphql', (req: express.Request, res: express.Response) => {
      GraphQLHTTP({
        schema: Schema.schema,
        rootValue: new RootValue(),
        context: new Context(req, res),
        graphiql: Environment.config.server.graphiql,
      })(req, res);
    });
  }
}
