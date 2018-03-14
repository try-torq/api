import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';
import { ICarMakeDocument } from './CarMake';
import { ICarPostDocument } from './CarPost';
import { NotFoundException, ValidationException } from '../exceptions';
import { ICarTagDocument } from '.';

export const CarModelSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    min: 1,
    max: 50,
  },
  lastYear: {
    type: Number,
    min: 1900,
    max: 2200,
  },
  firstYear: {
    type: Number,
    required: true,
    min: 1900,
    max: 2200,
  },
  make: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CarMake'
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarTag'
  }],
  carsPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarPost'
  }]
})

CarModelSchema.index(
  { name: 1, make: 1 },
  { unique: true }
)

export interface ICarModelDocument extends mongoose.Document {
  _id: string;
  name: string;
  lastYear?: number;
  firstYear: number;
  make: string;
  carPosts: ICarPostDocument;
  tags: ICarTagDocument;
}

CarModelSchema.plugin(uniqueValidator);

export const CarModelModel = mongoose.model<ICarModelDocument>('CarModel', CarModelSchema);

export interface INewCarModelBuffer {
  name: string;
  lastYear: number;
  firstYear: number;
  makeName: string;
}

export class CarModel extends AbstractModel<ICarModelDocument> {
  public get id(): string {
    return this._document.id;
  }

  public get name(): string {
    return this._document.name;
  }

  public get lastYear(): number {
    return this._document.lastYear;
  }

  public get firstYear(): number {
    return this._document.firstYear;
  }

  public get make(): string {
    return this._document.make;
  }

  public get cars(): ICarPostDocument {
    return this._document.carPosts;
  }

  public get inProduction(): boolean {
    return typeof this._document.lastYear !== 'undefined';
  }

  public set name(val: string) {
    this._document.name = val;
  }

  public set lastYear(val: number) {
    this._document.lastYear = val;
  }

  public set firstYear(val: number) {
    this._document.firstYear = val;
  }

  public toJson(): models.carModel.Attributes {
    const {
      id,
      name,
      firstYear,
      lastYear,
      make,
    } = this

    return {
      id,
      name,
      firstYear,
      lastYear,
      make
    }
  }
}
