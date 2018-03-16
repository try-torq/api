import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class LastnameField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'lastname';
  public description = 'The last name of the user.';
  public args;
}
