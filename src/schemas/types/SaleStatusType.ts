import { GraphQLEnumType } from 'graphql';

export const SaleStatusType = new GraphQLEnumType({
  name: 'SaleStatus',
  values: {
    notForSale: { value: 'notForSale' },
    forSale: { value: 'forSale' },
    sold: { value: 'sold' },
  }
});
