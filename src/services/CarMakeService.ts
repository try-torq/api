import { Logger } from '../core';
import { ICarMakeDocument, CarMake, CarMakeModel } from '../models';
import { NotFoundException } from '../exceptions';

export interface INewCarMakeBuffer {
  name: string;
}

export class CarMakeService {
  public static async findAll(): Promise<CarMake[]> {
    const documents = await CarMakeModel.find();
    return documents.map(document => new CarMake(document))
  }

  public static async findByName(name: string): Promise<CarMake> {
    const document = await CarMakeModel.findOne({ name });
    if (!document)
      throw new NotFoundException('CarMake');
    return new CarMake(document);
  }

  public static async create(buffer: INewCarMakeBuffer): Promise<CarMake> {
    const document = await CarMakeModel.create({
      name: buffer.name
    });

    await document.save();

    const make = new CarMake(document);
    return make;
  }
}
