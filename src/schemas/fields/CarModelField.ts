import { GraphQLField, GraphQLList } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarPost } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarModelType } from '../types';
import { CarModelService } from '../../services';

export class CarModelField extends AbstractField implements GraphQLField<CarPost | any, any> {
  private log = Logger('app:schemas:fields:CarModelField');
  public type = CarModelType;
  public name = 'carModel';
  public description = 'The associated car model.';
  public args;

  public async execute(
    source: CarPost,
    args: any,
    context: Context<any>
  ): Promise<models.carModel.Attributes>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carModel.Attributes> {
    const model = await CarModelService.findById(source.carModel);
    return model.toJson()
  }
}
