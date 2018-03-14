import { GraphQLField, GraphQLList } from 'graphql';

import { Logger } from '../../core';
import { Context } from '../../context';
import { TagType } from '../types';
import { AbstractField, IGraphQLField } from './AbstractField';
import { CarModel } from '../../models';

export class TagsField extends AbstractField implements IGraphQLField {
  public log = Logger('app:schemas:fields:tagsField');

  public type = new GraphQLList(TagType);
  public name = 'tags'
  public description = 'Tags for the resource.'
  public args;

  // public async execute(
  //   source: CarModel | any,
  //   args: any,
  //   context:Context<any>
  // ): Promise<models.carTag.Attributes> {
  //   const 
  // }
}
