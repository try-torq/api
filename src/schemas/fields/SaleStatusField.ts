import { GraphQLField } from 'graphql';

import { SaleStatusType } from '../types';

export class SaleStatusField implements GraphQLField<any, any> {
  public type = SaleStatusType;
  public name = 'saleStatus';
  public description = 'The status of the sale.';
  public args;
}
