import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export interface IJsonConvertableModel {
  toJson(): Object;
}

export class AbstractModel<T extends mongoose.Document> {
  constructor(
    protected _document: T
  ) { }

  public has(key: string): boolean {
    return typeof this._document[key] !== 'undefined';
  }

  public get(key: string): any {
    return this._document[key];
  }

  public set(key: string, value: any): void {
    this._document[key] = value;
  }

  public async save(options?: mongoose.SaveOptions): Promise<T> {
    this._document = await this._document.save(options);
    return this._document;
  }

  public async remove(): Promise<T> {
    return await this._document.remove();
  }

  public get id() {
    return this._document._id;
  }

  // name should be overriden for scope level logging
  public static Name = 'Abstract Model';
}
