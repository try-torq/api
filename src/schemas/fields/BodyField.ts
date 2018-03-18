import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class BodyField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'body';
  public description = 'The body of text for the resource.';
  public args;
}
