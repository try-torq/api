import { GraphQLObjectType } from 'graphql';

import {
  UserField,
  TokenField
} from '../fields';
import { CarPostsField } from '../fields/CarPostsField';

export const AuthenticationBufferType = new GraphQLObjectType({
  name: 'AuthenticationBuffer',
  description: 'An authentication buffer',
  fields: () => ({
    user: new UserField(),
    token: new TokenField(),
  })
});
