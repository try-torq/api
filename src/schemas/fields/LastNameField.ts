import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class LastNameField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'last name';
  public description = 'The last name of the user.';
  public args;
}