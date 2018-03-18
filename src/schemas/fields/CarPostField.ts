import { GraphQLField } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarPostComment } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarPostType } from '../types';
import { CarPostService } from '../../services';

export class CarPostField extends AbstractField implements GraphQLField<CarPostComment | any, any> {
  private log = Logger('app:schemas:fields:CarPostField');
  public type = CarPostType;
  public name = 'carPost';
  public description = 'The post.';
  public args;

  public async execute(
    source: CarPostComment,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes> {
    const post = await CarPostService.findById(source.post);
    return post.toJson();
  }
}
