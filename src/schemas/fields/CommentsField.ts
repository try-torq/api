import { GraphQLField, GraphQLList } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarPost } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarPostCommentType } from '../types';
import { CarPostCommentService } from '../../services';

export class CommentsField extends AbstractField implements GraphQLField<CarPost | any, any> {
  private log = Logger('app:schemas:fields:CommentsField');
  public type = new GraphQLList(CarPostCommentType);
  public name = 'carMake';
  public description = 'The comments.';
  public args;

  public async execute(
    source: CarPost,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carPost.Attributes[]> {
    this.log.debug('source => ', typeof source, source)
    const comments = await CarPostCommentService.findByPostId(source.id);
    return comments.map(comment => comment.toJson())
  }
}
