import * as mongoose from 'mongoose';

import { Logger } from '../core';
import { AbstractModel } from '../models';

export interface IPagenationOptions {
  offset?: number;
  limit?: number;
}

export interface IAbstractService<T extends mongoose.Document> {
  findAll(options: IPagenationOptions): Promise<T[]>;
  findById(id: string): Promise<T>;
  findByIds(ids: string[]): Promise<T[]>;
  search(text: string): Promise<T[]>;
  create(model: T): Promise<T>;
  update(newModel: T): Promise<T>;
  deleteById(id: string): Promise<T>;
}
