import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';
import { ICarModelDocument } from './CarModel';
import { NotFoundException, ValidationException } from '../exceptions';

export const CarMakeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    min: 1,
    max: 50,
  },
  models: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarModel',
  }],
})

CarMakeSchema.plugin(uniqueValidator);

export const CarMakeModel = mongoose.model('CarMake', CarMakeSchema);

export interface ICarMakeDocument extends mongoose.Document {
  _id: string;
  name: string;
  models: ICarModelDocument[];
}

export class CarMake extends AbstractModel<ICarMakeDocument> {
  public get id(): string {
    return this._document.id;
  }

  public get name(): string {
    return this._document.name;
  }

  public get models(): ICarModelDocument[] {
    return this._document.models;
  }

  public set name(val: string) {
    this._document.name = val;
  }
}
