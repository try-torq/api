import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';
import { ICarPostDocument } from './CarPost';
import { ICarModelDocument } from './CarModel';
import { NotFoundException, ValidationException } from '../exceptions';

export const CarTagSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    min: 2,
    max: 20,
  },
  carModels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarModel',
  }],
  carPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarPost'
  }]
})

CarTagSchema.plugin(uniqueValidator);

export const CarTagModel = mongoose.model('CarTag', CarTagSchema);

export interface ICarTagDocument extends mongoose.Document {
  _id: string;
  name: string;
  carModels: ICarModelDocument[];
  carPosts: ICarPostDocument[];
}

export class CarTag extends AbstractModel<ICarTagDocument> {
  public get id(): string {
    return this._document.id;
  }

  public get name(): string {
    return this._document.name;
  }

  public get carModels(): ICarModelDocument[] {
    return this._document.carModels;
  }

  public get carPosts(): ICarPostDocument[] {
    return this._document.carPosts;
  }
}
