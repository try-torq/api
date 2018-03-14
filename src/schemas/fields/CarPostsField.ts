import { GraphQLField, GraphQLList } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { User } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarPostType } from '../types';
import { CarPostService } from '../../services';

export class CarPostsField extends AbstractField implements GraphQLField<User | any, any> {
  private log = Logger('app:schemas:fields:CarPostsField');
  public type = new GraphQLList(CarPostType);
  public name = 'carPosts';
  public description = 'The users car posts.';
  public args;

  public async execute(
    source: User,
    args: any,
    context: Context<any>
  ): Promise<models.carPost.Attributes[]>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carPost.Attributes[]> {
    const posts = await CarPostService.findByUserId(source.id);
    return posts.map(post => post.toJson());
  }
}
