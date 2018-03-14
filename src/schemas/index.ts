import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import {
  FindUserByIdQuery,
  FindUserByUsernameQuery,
  FindUserByEmailQuery,
  FindAllCarMakesQuery,
  FindAllUsersQuery,
} from './queries';
import {
  CreateUserMutation,
  CreateCarPostMutation,
  AddCarMakeMutation,
  AddCarModelMutation
} from './mutations';

export class Schema {
  private static rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      findAllUsers: new FindAllUsersQuery(),
      findAllCarMakes: new FindAllCarMakesQuery(),
      findUserByEmail: new FindUserByEmailQuery(),
      findUserByUsername: new FindUserByUsernameQuery(),
      findUserById: new FindUserByIdQuery(),
    }
  })

  private static rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      addCarModel: new AddCarModelMutation(),
      addCarMake: new AddCarMakeMutation(),
      createUser: new CreateUserMutation(),
      createCarPost: new CreateCarPostMutation(),
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
