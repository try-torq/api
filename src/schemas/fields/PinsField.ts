import { GraphQLField, GraphQLList } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarPost } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarPostPinType } from '../types';
import { CarPostPinService } from '../../services';

export class PinsField extends AbstractField implements GraphQLField<CarPost | any, any> {
  private log = Logger('app:schemas:fields:PinsField');
  public type = new GraphQLList(CarPostPinType);
  public name = 'carMake';
  public description = 'The Pins.';
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
    const pins = await CarPostPinService.findByPostId(source.id);
    return pins.map(pin => pin.toJson())
  }
}
