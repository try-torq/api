import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class TokenField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'token';
  public description = 'An authentication token.';
  public args;
}
