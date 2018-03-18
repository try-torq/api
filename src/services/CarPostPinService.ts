import { Logger } from '../core';
import { CarPost, CarPostPin, CarPostPinModel } from '../models';
import { NotFoundException } from '../exceptions';

export interface INewCarPostPinBuffer {
  post: string;
  user: string;
}

export class CarPostPinService {
  public static async findAll(): Promise<CarPostPin[]> {
    const documents = await CarPostPinModel.find();
    return documents.map(document => new CarPostPin(document));
  }

  public static async findById(id: string): Promise<CarPostPin> {
    const document = await CarPostPinModel.findById(id);
    if (!document)
      throw new NotFoundException('CarPostPin');
    return new CarPostPin(document);
  }

  public static async findByIds(ids: string[]): Promise<CarPostPin[]> {
    return Promise.all(ids.map(async id => await this.findById(id)));
  }

  public static async create(buffer: INewCarPostPinBuffer): Promise<CarPostPin> {
    const document = await CarPostPinModel.create(buffer);
    return new CarPostPin(document);
  }

  public static async findByUserId(id: string): Promise<CarPostPin[]> {
    const documents = await CarPostPinModel.find({ user: id });
    return documents.map(document => new CarPostPin(document));
  }

  public static async findByPostId(id: string): Promise<CarPostPin[]> {
    const documents = await CarPostPinModel.find({ post: id });
    return documents.map(document => new CarPostPin(document));
  }
}
