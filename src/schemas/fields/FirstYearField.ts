import { GraphQLInt, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class FirstYearField implements GraphQLField<any, any> {
  public type = GraphQLInt;
  public name = 'firstYear';
  public description = 'The last year of production for a the model.';
  public args;
}
