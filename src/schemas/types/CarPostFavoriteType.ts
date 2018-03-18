import { GraphQLObjectType, GraphQLEnumType } from 'graphql';

import {
  IdField,
  CarPostField,
  CommenterField,
} from '../fields';
import { FavoriterField } from '../fields/FavoriterField';

export const CarPostFavoriteType = new GraphQLObjectType({
  name: 'CarPostFavorite',
  description: 'A comment.',
  fields: () => ({
    id: new IdField(),
    user: new FavoriterField(),
    post: new CarPostField(),
  })
});
