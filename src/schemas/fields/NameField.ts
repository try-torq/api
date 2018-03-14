import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class NameField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'name';
  public description = 'The name of the resource';
  public args;
}
