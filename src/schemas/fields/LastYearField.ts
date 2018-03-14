import { GraphQLInt, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class LastYearField implements GraphQLField<any, any> {
  public type = GraphQLInt;
  public name = 'lastYear';
  public description = 'The last year of production for a the model.';
  public args;
}
