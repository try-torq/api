import { GraphQLField, GraphQLList } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarMake } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarModelType } from '../types';
import { CarModelService } from '../../services';

export class CarModelsField extends AbstractField implements GraphQLField<CarMake | any, any> {
  private log = Logger('app:schemas:fields:CarModelsField');
  public type = new GraphQLList(CarModelType);
  public name = 'carModels';
  public description = 'The car models of the make.';
  public args;

  public async execute(
    source: CarMake,
    args: any,
    context: Context<any>
  ): Promise<models.carModel.Attributes[]>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carModel.Attributes[]> {
    const models = await CarModelService.findByCarMakeId(source.id);
    return models.map(model => model.toJson());
  }
}
