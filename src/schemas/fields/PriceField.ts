import { GraphQLFloat, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class PriceField implements GraphQLField<any, any> {
  public type = GraphQLFloat;
  public name = 'price';
  public description = 'The price of the car.';
  public args;
}
