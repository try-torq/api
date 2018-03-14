import { Logger } from '../core';
import { ICarMakeDocument, CarMake, CarMakeModel, CarModelModel } from '../models';
import { NotFoundException } from '../exceptions';

export interface INewCarMakeBuffer {
  name: string;
}

export class CarMakeService {
  public static async findAll(): Promise<CarMake[]> {
    const documents = await CarMakeModel.find();
    return documents.map(document => new CarMake(document));
  }

  public static async findById(id: string): Promise<CarMake> {
    const document = await CarMakeModel.findById(id);
    if (!document)
      throw new NotFoundException('CarMake');
    return new CarMake(document);
  }

  public static async findByName(name: string): Promise<CarMake> {
    const document = await CarMakeModel.findOne({ name });
    if (!document)
      throw new NotFoundException('CarMake');
    return new CarMake(document);
  }

  public static async findOrCreate(name: string): Promise<CarMake> {
    let make = await this.findByName(name);
    return make || await this.create({ name })
  }

  public static async create(buffer: INewCarMakeBuffer): Promise<CarMake> {
    const document = await CarMakeModel.create({
      name: buffer.name
    });

    await document.save();

    const make = new CarMake(document);
    return make;
  }

  public static async findByCarModelId(id: string): Promise<CarMake> {
    const { make } = await CarModelModel.findById(id)
    return await this.findById(make);
  }
}
