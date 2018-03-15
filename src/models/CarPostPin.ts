import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';

export const CarPostPinSchema = new mongoose.Schema({
  carPost: { type: mongoose.Schema.Types.ObjectId, ref: 'CarPost' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: {
    createdAt: 'pinnedAt',
  }
});

CarPostPinSchema.index(
  { carPost: 1, user: 1 },
  { unique: true }
);

export interface ICarPostPinDocument extends mongoose.Document {
  _id: string;
  carPost: string;
  user: string;
  pinnedAt: Date;
}

CarPostPinSchema.plugin(uniqueValidator);

export const CarPostFavoriteSchemaModel =
  mongoose.model<ICarPostPinDocument>('CarPostPin', CarPostPinSchema);

export class CarPostFavorite extends AbstractModel<ICarPostPinDocument> {
  public get carPost(): string {
    return this._document.carPost;
  }

  public get user(): string {
    return this._document.user;
  }

  public get pinnedAt(): Date {
    return this._document.pinnedAt;
  }

  public toJson(): models.carPostPin.Attributes {
    const { id, carPost, user, pinnedAt } = this;
    return { id, carPost, user, pinnedAt };
  }
}
