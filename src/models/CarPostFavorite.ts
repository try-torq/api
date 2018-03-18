import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';

export const CarPostFavoriteSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'CarPost' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: {
    createdAt: 'favoritedAt',
  }
});

CarPostFavoriteSchema.index(
  { carPost: 1, user: 1 },
  { unique: true }
);

export interface ICarPostFavoriteDocument extends mongoose.Document {
  _id: string;
  post: string;
  user: string;
  favoritedAt: Date;
}

CarPostFavoriteSchema.plugin(uniqueValidator);

export const CarPostFavoriteModel =
  mongoose.model<ICarPostFavoriteDocument>('CarPostFavorite', CarPostFavoriteSchema);

export class CarPostFavorite extends AbstractModel<ICarPostFavoriteDocument> {
  public get post(): string {
    return this._document.post;
  }

  public get user(): string {
    return this._document.user;
  }

  public get favoritedAt(): Date {
    return this._document.favoritedAt;
  }

  public toJson(): models.carPostFavorite.Attributes {
    const { id, post, user, favoritedAt } = this;
    return { id, post, user, favoritedAt };
  }
}
