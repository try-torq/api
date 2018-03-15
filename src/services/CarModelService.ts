import { Logger } from '../core';
import { ICarModelDocument, CarModel, CarModelModel } from '../models';
import { CarMakeService } from './CarMakeService';
import { NotFoundException } from '../exceptions';

export interface INewCarModelBuffer {
  name: string;
  makeName: string;
  lastYear?: number;
  firstYear: number;
}

export class CarModelService {
  private static log = Logger('app:services:CarModelService');

  public static async findAll(): Promise<CarModel[]> {
    const documents = await CarModelModel.find();
    return documents.map(document => new CarModel(document))
  }

  public static async findById(id: string): Promise<CarModel> {
    const document = await CarModelModel.findById(id);
    if (!document)
      throw new NotFoundException('CarModel');
    return new CarModel(document);
  }

  public static async create(buffer: INewCarModelBuffer): Promise<CarModel> {
    const { name, lastYear, firstYear, makeName } = buffer;
    const make = await CarMakeService.findOrCreate(makeName);

    const document = await CarModelModel.create({
      name,
      make: make.id,
      lastYear,
      firstYear,
    });

    make.models.push(document.id);
    await make.save();

    return new CarModel(document);
  }

  public static async findByCarMakeAndName(makeName: string, name: string): Promise<CarModel> {
    this.log.debug(`makeName => ${makeName}; name => ${name}`);
    const { id } = await CarMakeService.findByName(makeName);
    this.log.info(`car make id => ${id}`);
    const document = await CarModelModel.findOne({ make: id, name });
    console.log(`car document => ${document}`);
    return new CarModel(document);
  }

  public static async findByCarMakeId(id: string): Promise<CarModel[]> {
    const { models } = await CarMakeService.findById(id);
    return Promise.all(models.map(async id => {
      return await this.findById(id);
    }));
  }
}
