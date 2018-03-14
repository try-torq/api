import { GraphQLObjectType } from 'graphql';

import {
  IdField,
  NameField,
  LastYearField,
  FirstYearField,
  CarMakeField,
  // TagsField,
  // CarPostsField,
} from '../fields';

export const CarModelType = new GraphQLObjectType({
  name: 'CarModel',
  description: 'A single car model.',
  fields: () => ({
    id: new IdField(),
    name: new NameField(),
    lastYear: new LastYearField(),
    firstYear: new FirstYearField(),
    // tags: new TagsField(),
    make: new CarMakeField(),
    // carPosts: new CarPostsField(),
  })
});
