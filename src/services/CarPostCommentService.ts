import { Logger } from '../core';
import { CarPost, CarPostComment, CarPostCommentModel } from '../models';
import { NotFoundException } from '../exceptions';
import { CarPostService } from '.';

export interface INewCarPostCommentBuffer {
  post: string;
  commenter: string;
  body: string;
}

export class CarPostCommentService {
  public static async findAll(): Promise<CarPostComment[]> {
    const documents = await CarPostCommentModel.find();
    return documents.map(document => new CarPostComment(document));
  }

  public static async findById(id: string): Promise<CarPostComment> {
    const document = await CarPostCommentModel.findById(id);
    if (!document)
      throw new NotFoundException('CarPostComment');
    return new CarPostComment(document);
  }

  public static async findByIds(ids: string[]): Promise<CarPostComment[]> {
    return Promise.all(ids.map(async id => await this.findById(id)));
  }

  public static async create(buffer: INewCarPostCommentBuffer): Promise<CarPostComment> {
    const document = await CarPostCommentModel.create(buffer);
    return new CarPostComment(document);
  }

  public static async findByPostId(id: string): Promise<CarPostComment[]> {
    const documents = await CarPostCommentModel.find({ post: id });
    return documents.map(document => new CarPostComment(document));
  }

  public static async findByUserId(id: string): Promise<CarPostComment[]> {
    const documents = await CarPostCommentModel.find({ user: id });
    return documents.map(document => new CarPostComment(document));
  }
}
