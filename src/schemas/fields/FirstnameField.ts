import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class FirstnameField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'firstname';
  public description = 'The first name of the user.';
  public args;
}
