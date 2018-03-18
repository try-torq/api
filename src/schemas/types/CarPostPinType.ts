import { GraphQLObjectType, GraphQLEnumType } from 'graphql';

import {
  IdField,
  PinnerField,
  CarPostField,
} from '../fields';

export const CarPostPinType = new GraphQLObjectType({
  name: 'CarPostPin',
  description: 'A pin.',
  fields: () => ({
    id: new IdField(),
    user: new PinnerField(),
    post: new CarPostField(),
  })
});
