import { GraphQLField } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarModel } from '../../models'; 
import { AbstractField } from './AbstractField';
import { UserType } from '../types';
import { CarMakeService, UserService } from '../../services';

export class CommenterField extends AbstractField implements GraphQLField<CarModel | any, any> {
  private log = Logger('app:schemas:fields:CommenterField');
  public type = UserType;
  public name = 'commenter';
  public description = 'The commenter.';
  public args;

  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes> {
    this.log.debug(JSON.stringify(source));
    const user = await UserService.findById(source.commenter);
    return user.toJson();
  }
}
