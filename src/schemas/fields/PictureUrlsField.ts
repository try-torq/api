import { GraphQLList, GraphQLString, GraphQLFieldConfig, GraphQLField } from 'graphql';

export class PictureUrlsField implements GraphQLField<any, any> {
  public type = new GraphQLList(GraphQLString);
  public name = 'pictureUrls';
  public description = 'The pictures for a given post.';
  public args;
}
