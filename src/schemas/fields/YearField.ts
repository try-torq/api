import { GraphQLInt, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class YearField implements GraphQLField<any, any> {
  public type = GraphQLInt;
  public name = 'year';
  public description = 'The year of the car.';
  public args;
}
