import { GraphQLObjectType } from 'graphql';

import {
  IdField,
  FirstnameField,
  LastnameField,
  EmailField,
  RoleField,
  UsernameField,
  JoinedAtField,
  AvatarUrlField,
  CarPostsField,
} from '../fields';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A single user',
  fields: () => ({
    id: new IdField(),
    firstname: new FirstnameField(),
    lastname: new LastnameField(),
    email: new EmailField(),
    username: new UsernameField(),
    role: new RoleField(),
    joinedAt: new JoinedAtField(),
    cars: new CarPostsField(),
    avatarUrl: new AvatarUrlField()
  })
});
