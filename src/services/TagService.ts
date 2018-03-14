import { Logger } from '../core';
import { ICarTagDocument, CarTagModel, CarTag } from '../models';
import { NotFoundException } from '../exceptions';

export class TagService {
  public static async create(name: string): Promise<CarTag> {
    const document = await CarTagModel.create({ name })
    return new CarTag(document);
  }

  public static async findAll(): Promise<CarTag[]> {
    const documents = await CarTagModel.find();
    return documents.map(document => new CarTag(document));
  }

  public static async findByName(name: string): Promise<CarTag> {
    const document = await CarTagModel.findOne({ name });
    if (!document)
      throw new NotFoundException('CarTag');
    return new CarTag(document);
  }

  public static async findOrCreate(name: string): Promise<CarTag> {
    const document = await CarTagModel.findOne({ name });
    return document
      ? new CarTag(document)
      : await this.create(name);
  }

  public static async findOrCreateMultiple(names: string[]): Promise<CarTag[]> {
    return Promise.all(names.map(async name => await this.findOrCreate(name)));
  }

  public static async findByIds(ids: string[]): Promise<CarTag[]> {
    const documents = await CarTagModel.find({ _id: { $in: ids } });
    return documents.map(document => new CarTag(document));
  }
}
