export interface IPagenationOptions {
  offset?: number;
  limit?: number;
}

export interface IAbstractCrudService<T> {
  findAll(options: IPagenationOptions): Promise<T[]>;
  findById(id: string): Promise<T>;
  findByIds(ids: string[]): Promise<T[]>;
  search(text: string): Promise<T[]>;
  create(model: T): Promise<T>;
  update(newModel: T): Promise<T>;
  deleteById(id: string): Promise<T>;
}

// export class AbstractCrudService<T> {
//   findAll()
// }
