import { GraphQLObjectType } from 'graphql';

import {
  IdField,
  NameField,
  LastYearField,
  FirstYearField,
  // MakeField,
  // TagsField,
  // CarPostsField,
} from '../fields';

export const CarMakeType = new GraphQLObjectType({
  name: 'CarMake',
  description: 'A single car manufacturer.',
  fields: () => ({
    id: new IdField(),
    name: new NameField(),
    lastYear: new LastYearField(),
    firstYear: new FirstYearField(),
    // tags: new TagsField(),
    // make: new MakeField(),
    // carPosts: new CarPostsField(),
  })
});
