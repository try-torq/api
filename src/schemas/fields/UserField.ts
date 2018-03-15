import { GraphQLFieldConfig, GraphQLField } from 'graphql';

import { UserType } from '../types';

export class UserField implements GraphQLField<any, any> {
  public type = UserType;
  public name = 'user';
  public description = 'The authenticated user.';
  public args;
}
