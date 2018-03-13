import { GraphQLID, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class IdField implements GraphQLField<any, any> {
  public type = GraphQLID;
  public name = 'id';
  public description = 'The unique identifier for the given resource.';
  public args;
}
