import { GraphQLField } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarModel } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarMakeType, CarModelType } from '../types';
import { CarMakeService } from '../../services';

export class CarMakeField extends AbstractField implements GraphQLField<CarModel | any, any> {
  private log = Logger('app:schemas:fields:CarMakeField');
  public type = CarMakeType;
  public name = 'carMake';
  public description = 'The make of the car model.';
  public args;

  public async execute(
    source: CarModel,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes> {
    const make = await CarMakeService.findByCarModelId(source.id);
    return make.toJson();
  }
}
