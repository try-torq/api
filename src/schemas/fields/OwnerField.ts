import { GraphQLField } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarPost } from '../../models'; 
import { AbstractField } from './AbstractField';
import { UserType } from '../types';
import { UserService } from '../../services';

export class OwnerField extends AbstractField implements GraphQLField<CarPost | any, any> {
  private log = Logger('app:schemas:fields:OwnerField');
  public type = UserType;
  public name = 'owner';
  public description = 'The owner of the car post.';
  public args;

  public async execute(
    source: CarPost,
    args: any,
    context: Context<any>
  ): Promise<models.user.Attributes>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.user.Attributes> {
    const owner = await UserService.findById(source.owner);
    return owner.toJson();
  }
}
