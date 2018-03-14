import { GraphQLObjectType, GraphQLEnumType } from 'graphql';

import {
  IdField,
  NameField,
  YearField,
  SaleStatusField,
  // OwnerField,
  // CarModelField,
} from '../fields';

export const CarMakeType = new GraphQLObjectType({
  name: 'CarMake',
  description: 'A single car manufacturer.',
  fields: () => ({
    id: new IdField(),
    name: new NameField(),
    // carModel: new CarModelField(),
    // owner: new OwnerField(),
    // tags: new TagsField(),
    year: new YearField(),
    saleStatus: new SaleStatusField(),
  })
});
