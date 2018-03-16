import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class AvatarUrlField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'avatarUrl';
  public description = 'The avatar URL of a given user.';
  public args;
}
