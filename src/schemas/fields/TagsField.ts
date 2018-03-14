import { GraphQLField, GraphQLList } from 'graphql';

import { Logger } from '../../core';
import { Context } from '../../context';
import { TagType } from '../types';
import { TagService } from '../../services';
import { AbstractField, IGraphQLField } from './AbstractField';
import { CarModel, CarPost } from '../../models';

export class TagsField extends AbstractField implements GraphQLField<any | CarPost, any>, IGraphQLField {
  public log = Logger('app:schemas:fields:tagsField');

  public type = new GraphQLList(TagType);
  public name = 'tags'
  public description = 'Tags for the resource.'
  public args;

  public async execute(
    source: CarPost,
    args: any,
    context: Context<any>
  ): Promise<models.carTag.Attributes[]>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carTag.Attributes[]> {
    const tags = await TagService.findByIds(source.tags);
    return tags.map(tag => tag.toJson())
  }
}
