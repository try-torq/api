import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class RoleField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'role';
  public description = 'Role of the user.';
  public args;
}
