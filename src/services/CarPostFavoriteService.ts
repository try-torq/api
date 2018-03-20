import { Logger } from '../core';
import { CarPost, CarPostFavorite, CarPostFavoriteModel } from '../models';
import { NotFoundException } from '../exceptions';

export interface INewCarPostFavoriteBuffer {
  post: string;
  user: string;
}

export class CarPostFavoriteService {
  public static async findAll(): Promise<CarPostFavorite[]> {
    const documents = await CarPostFavoriteModel.find();
    return documents.map(document => new CarPostFavorite(document));
  }

  public static async findById(id: string): Promise<CarPostFavorite> {
    const document = await CarPostFavoriteModel.findById(id);
    if (!document)
      throw new NotFoundException('CarPostFavorite');
    return new CarPostFavorite(document);
  }

  public static async findByIds(ids: string[]): Promise<CarPostFavorite[]> {
    return Promise.all(ids.map(async id => await this.findById(id)));
  }

  public static async create(buffer: INewCarPostFavoriteBuffer): Promise<CarPostFavorite> {
    const document = await CarPostFavoriteModel.create(buffer);
    return new CarPostFavorite(document);
  }

  public static async findByPostId(id: string): Promise<CarPostFavorite[]> {
    const documents = await CarPostFavoriteModel.find({ post: id });
    return documents.map(document => new CarPostFavorite(document));
  }

  public static async findByUserId(id: string): Promise<CarPostFavorite[]> {
    const documents = await CarPostFavoriteModel.find({ user: id });
    return documents.map(document => new CarPostFavorite(document));
  }

  public static async findAndDelete(user: string, post: string): Promise<CarPostFavorite> {
    const document = await CarPostFavoriteModel.deleteOne({ user, post });
    return new CarPostFavorite(document);
  }
}
