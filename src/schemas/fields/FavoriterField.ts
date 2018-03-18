import { GraphQLField } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarModel } from '../../models'; 
import { AbstractField } from './AbstractField';
import { UserType } from '../types';
import { CarMakeService, UserService } from '../../services';

export class FavoriterField extends AbstractField implements GraphQLField<CarModel | any, any> {
  private log = Logger('app:schemas:fields:FavoriterField');
  public type = UserType;
  public name = 'favoriter';
  public description = 'The favoriter.';
  public args;

  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes> {
    const user = await UserService.findById(source.user);
    return user.toJson();
  }
}
