import { Logger } from '../core';
import { ICarModelDocument, CarPost, CarPostModel } from '../models';
import { CarModelService } from './CarModelService';
import { TagService } from './TagService';
import { NotFoundException } from '../exceptions';
import { UserService } from '.';

export interface INewCarPostBuffer {
  nickname: string;
  owner: string;
  carModelName: string;
  carMakeName: string;
  tags?: string[];
  year: number;
  saleStatus: string;
  price?: number;
  pictureUrls?: string[];
  primaryPictureIndex?: number;
}

export class CarPostService {
  public static async findAll(): Promise<CarPost[]> {
    const documents = await CarPostModel.find();
    return documents.map(document => new CarPost(document))
  }

  public static async findById(id: string): Promise<CarPost> {
    const document = await CarPostModel.findById(id);
    if (!document)
      throw new Error('CarPost');
    return new CarPost(document);
  }

  public static async findByUsername(username: string): Promise<CarPost[]> {
    const { carPosts } = await UserService.findByUsername(username);
    return Promise.all(carPosts.map(async id => await this.findById(id)));
  }

  public static async findByNicknameAndUsername(nickname: string, username: string): Promise<CarPost> {
    const { id } = await UserService.findByUsername(username);
    const document = await CarPostModel.findOne({ nickname, owner: id })
    if (!document)
      throw new NotFoundException('CarPost');
    return new CarPost(document);
  }

  public static async findByIds(ids: string[]): Promise<CarPost[]> {
    const documents = await CarPostModel.find({ _id: { $in: ids } });
    return Promise.all(documents.map(document => new CarPost(document)));
  }

  public static async findByUserId(id: string): Promise<CarPost[]> {
    const documents = await CarPostModel.find({ owner: id });
    return documents.map(document => new CarPost(document));
  }

  public static async create(buffer: INewCarPostBuffer): Promise<CarPost> {
    const {
      nickname,
      owner,
      carModelName,
      carMakeName,
      tags,
      year,
      saleStatus,
      price,
      pictureUrls,
      primaryPictureIndex
    } = buffer;

    const { id } = await CarModelService.findByCarMakeAndName(carMakeName, carModelName);
    const $tags = await TagService.findOrCreateMultiple(tags)

    const document = await CarPostModel.create({
      nickname,
      owner,
      carModel: id,
      tags: $tags.map(tag => tag.id),
      year,
      saleStatus,
      price,
      pictureUrls,
      primaryPictureIndex
    })

    return new CarPost(document);
  }
}
