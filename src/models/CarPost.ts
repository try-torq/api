import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';
import { ICarModelDocument } from './CarModel';
import { NotFoundException, ValidationException } from '../exceptions';
import { IUserDocument } from './User';
import { ICarTagDocument } from '.';

const CarPostSchema = new mongoose.Schema({
  nickname: {
    type: String,
    trim: true,
    required: true,
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
  primaryPictureIndex: {
    type: Number,
    default: 0,
  },
  pictureUrls: [{
    type: String,
    trim: true,
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarTag',
  }],
  body: {
    type: String,
    trim: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarPostComment',
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarPostFavorite',
  }],
  pins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarPostPin',
  }],
  year: {
    type: Number,
    required: true,
  },
  saleStatus: {
    type: String,
    default: 'notForSale',
    enum: ['notForSale', 'forSale', 'sold']
  },
  price: {
    type: Number,
  },
}, {
  timestamps: {
    createdAt: 'publishedAt',
    updatedAt: 'editedAt',
  }
});

CarPostSchema.index(
  { owner: 1, nickname: 1 },
  { unique: true }
);

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
  owner: string;
  carModel: string;
  pictureUrls: string[];
  primaryPictureIndex: number;
  tags: string[];
  year: number;
  saleStatus: string;
  body?: string;
  comments?: string[];
  favorites?: string[];
  pins?: string[];
  price?: number;
  publishedAt: Date;
  editedAt?: Date;
}

CarPostSchema.plugin(uniqueValidator);

export const CarPostModel = mongoose.model<ICarPostDocument>('CarPost', CarPostSchema);

export class CarPost extends AbstractModel<ICarPostDocument> {

  public get nickname(): string {
    return this._document.nickname;
  }

  public get body(): string {
    return this._document.body;
  }

  public get comments(): string[] {
    return this._document.comments;
  }

  public get favorites(): string[] {
    return this._document.favorites;
  }

  public get pins(): string[] {
    return this._document.pins;
  }

  public get owner(): string {
    return this._document.owner;
  }

  public get carModel(): string {
    return this._document.carModel;
  }

  public get year(): number {
    return this._document.year;
  }

  public get saleStatus(): string {
    return this._document.saleStatus;
  }

  public get pictureUrls(): string[] {
    return this._document.pictureUrls;
  }

  public get primaryPictureIndex(): number {
    return this._document.primaryPictureIndex;
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

  public get tags(): string[] {
    return this._document.tags;
  }

  public set nickname(val: string) {
    this._document.nickname = val;
  }

  public set year(val: number) {
    this._document.year = val
  }

  public toJson(): models.carPost.Attributes {
    const {
      id,
      nickname,
      owner,
      carModel,
      saleStatus,
      price,
      publishedAt,
      editedAt,
      primaryPictureIndex,
      pictureUrls,
      tags,
      year,
      body,
      comments,
      favorites,
      pins,
    } = this;

    return {
      id,
      nickname,
      owner,
      carModel,
      saleStatus,
      pictureUrls,
      primaryPictureIndex,
      price,
      publishedAt,
      editedAt,
      tags,
      year,
      body,
      comments,
      favorites,
      pins
    };
  }
}
