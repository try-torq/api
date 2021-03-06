import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import {
  FindUserByIdQuery,
  FindUserByUsernameQuery,
  FindUserByEmailQuery,
  FindAllCarMakesQuery,
  FindAllUsersQuery,
  FindAllCarPostsQuery,
} from './queries';
import {
  CreateUserMutation,
  CreateCarPostMutation,
  AddCarMakeMutation,
  AddCarModelMutation,
  LoginMutation,
  LoginWithEmailMutation,
  FavoritePostMutation,
  AddCommentMutation,
  UnfavoritePostMutation,
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
      findAllCarPosts: new FindAllCarPostsQuery(),
    }
  })

  private static rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
      addCarModel: new AddCarModelMutation(),
      addCarMake: new AddCarMakeMutation(),
      createUser: new CreateUserMutation(),
      createCarPost: new CreateCarPostMutation(),
      login: new LoginMutation(),
      loginWithEmail: new LoginWithEmailMutation(),
      favoritePost: new FavoritePostMutation(),
      unfavoritePost: new UnfavoritePostMutation(),
      addComment: new AddCommentMutation(),
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
