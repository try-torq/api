import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class EmailField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'email';
  public description = 'The email of the user';
  public args;
}
