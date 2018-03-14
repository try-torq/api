import { GraphQLObjectType } from 'graphql';

import {
  IdField,
  NameField,
} from '../fields';

export const CarMakeType = new GraphQLObjectType({
  name: 'CarMake',
  description: 'A single car manufacturer.',
  fields: () => ({
    id: new IdField(),
    name: new NameField(),
  })
});
