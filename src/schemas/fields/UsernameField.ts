import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class UsernameField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'user name';
  public description = 'The username name of the user.';
  public args;
}
