import { GraphQLEnumType } from 'graphql';

export const RoleType = new GraphQLEnumType({
  name: 'Role',
  values: {
    user: { value: 'user' },
    mod: { value: 'mod' },
    admin: { value: 'admin' },
  }
});
