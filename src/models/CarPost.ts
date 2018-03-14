import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';
import { ICarModelDocument } from './CarModel';
import { NotFoundException, ValidationException } from '../exceptions';
import { IUserDocument } from './User';
import { ICarTagDocument } from '.';

const CarPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nickname: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    min: 1,
    max: 50,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  carModel: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarModel',
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarTag',
  }],
  year: {
    type: Number,
    required: true,
    unique: true,
  },
  saleStatus: {
    type: String,
    default: 'notForSale',
    enum: ['notForSale', 'forSale', 'sold']
  },
  price: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: {
    createdAt: 'publishedAt',
    updatedAt: 'editedAt',
  }
});

CarPostSchema.pre('save', async function(next: Function) {
  const { year, carModel } = this

  try {
    const $carModel = await this.model('CarModel').findById(carModel);
    if (!$carModel)
      throw new NotFoundException('CarModel');
    if ($carModel.firstYear > year || ($carModel.lastYear && $carModel.lastYear < year ))
      throw new ValidationException('Car year out of bounds for model');
  } catch (err) {
    next(err);
  }

  next();
});

export interface ICarPostDocument extends mongoose.Document {
  _id: string;
  nickname: string;
  owner: IUserDocument;
  carModel: ICarModelDocument;
  tags: ICarTagDocument[];
  year: number;
  saleStatus: string;
  price?: number;
  publishedAt: Date;
  editedAt?: Date;
}

CarPostSchema.plugin(uniqueValidator);

export const CarPostModel = mongoose.model<ICarPostDocument>('CarPost', CarPostSchema);

export class CarPost extends AbstractModel<ICarPostDocument> {
  public get id(): string {
    return this._document.id;
  }

  public get nickname(): string {
    return this._document.nickname;
  }

  public get owner(): IUserDocument {
    return this._document.owner;
  }

  public get carModel(): ICarModelDocument {
    return this._document.carModel;
  }

  public get year(): number {
    return this._document.year;
  }

  public get saleStatus(): string {
    return this._document.saleStatus;
  }

  public get isForSale(): boolean {
    return this.saleStatus === 'forSale';
  }

  public get isSold(): boolean {
    return this.saleStatus === 'isSold';
  }

  public get isNotForSale(): boolean {
    return this.saleStatus === 'notForSale';
  }

  public get price(): number {
    return this._document.price;
  }

  public get publishedAt(): Date {
    return this._document.publishedAt;
  }

  public get editedAt(): Date {
    return this._document.editedAt;
  }

  public get tags(): ICarTagDocument[] {
    return this._document.tags;
  }

  public set nickname(val: string) {
    this._document.nickname = val;
  }

  public set year(val: number) {
    this._document.year = val
  }
}
