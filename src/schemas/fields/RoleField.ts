import { GraphQLFieldConfig, GraphQLField } from 'graphql';

import { RoleType } from '../types';

export class RoleField implements GraphQLField<any, any> {
  public type = RoleType;
  public name = 'role';
  public description = 'Role of the user.';
  public args;
}
