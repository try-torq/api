import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { FindUserByIdQuery, FindUserByUsernameQuery } from './queries';
import { CreateUserMutation } from './mutations';

export class Schema {
  private static rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      findUserByUsername: new FindUserByUsernameQuery(),
      findUserById: new FindUserByIdQuery(),
    }
  })

  private static rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      createUser: new CreateUserMutation(),
    }
  })

  private static _schema = new GraphQLSchema({
    query: Schema.rootQuery,
    mutation: Schema.rootMutation
  })

  public static get schema(): GraphQLSchema {
    return this._schema;
  }
}
