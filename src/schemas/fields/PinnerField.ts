import { GraphQLField } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarModel } from '../../models'; 
import { AbstractField } from './AbstractField';
import { UserType } from '../types';
import { UserService } from '../../services';

export class PinnerField extends AbstractField implements GraphQLField<CarModel | any, any> {
  private log = Logger('app:schemas:fields:PinnerField');
  public type = UserType;
  public name = 'commenter';
  public description = 'The commenter.';
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
