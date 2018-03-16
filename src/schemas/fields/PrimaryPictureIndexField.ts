import { GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class PrimaryPictureIndexField implements GraphQLField<any, any> {
  public type = GraphQLString;
  public name = 'primaryPictureIndex';
  public description = 'The primary index of the post\'s pictures.';
  public args;
}
