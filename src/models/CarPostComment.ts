import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';

const CarPostCommentSchema = new mongoose.Schema ({
  body: {
    type: String,
    trim: true,
    required: true
  },
  commenter: mongoose.Schema.Types.ObjectId,
  post: mongoose.Schema.Types.ObjectId,
});

export interface ICarPostCommentDocument extends mongoose.Document {
  _id: string;
  body: string;
  commenter: string;
  post: string;
}

export const CarPostCommentModel =
  mongoose.model<ICarPostCommentDocument>('CarPostComment', CarPostCommentSchema);

export class CarPostComment extends AbstractModel<ICarPostCommentDocument> {
  public get body(): string {
    return this._document.body;
  }

  public get commenter(): string {
    return this._document.commenter;
  }

  public get post(): string {
    return this._document.post;
  }

  public toJson(): models.carPostComment.Attributes {
    const {
      id,
      body,
      commenter,
      post
    } = this;

    return {
      id,
      body,
      commenter,
      post
    };
  }
}
