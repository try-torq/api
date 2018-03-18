import { GraphQLObjectType, GraphQLEnumType } from 'graphql';

import {
  IdField,
  UserField,
  BodyField,
  CarPostField,
} from '../fields';
import { CommenterField } from '../fields/CommenterField';

export const CarPostCommentType = new GraphQLObjectType({
  name: 'CarPostComment',
  description: 'A comment.',
  fields: () => ({
    id: new IdField(),
    commenter: new CommenterField(),
    body: new BodyField(),
    post: new CarPostField(),
  })
});
