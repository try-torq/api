import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class NameField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'nickname';
  public description = 'The nickname for the car.';
  public args;
}
