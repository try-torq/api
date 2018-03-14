import { GraphQLObjectType } from 'graphql';

import {
  IdField,
  NameField,
} from '../fields';

export const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A single tag.',
  fields: () => ({
    id: new IdField(),
    name: new NameField(),
  })
});
