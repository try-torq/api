import { Logger } from '../core';
import { IUserDocument, User, UserModel, IUserAuthenticationBuffer } from '../models'
import { IAbstractService, IPagenationOptions } from './AbstractService';
import { NotFoundException, UnauthorizedException } from '../exceptions';

export interface INewUserBuffer {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  role?: string;
}

export class UserService {
  private static log = Logger('app:services:UserService');

  public static async findAll(options?: IPagenationOptions): Promise<User[]> {
    const { offset, limit } = options;
    const users = await UserModel.find()
      .skip(offset || 0)
      .limit(limit || 100);
    return users
      .map(document => new User(document));
  }

  public static async authenticate(username: string, password: string): Promise<IUserAuthenticationBuffer> {
    const user = await this.findByUsername(username);
    const isMatch = await user.checkPassword(password);
    if (!isMatch)
      throw new UnauthorizedException('invalid username or password');
    const token = await user.genToken();
    return { user: user.toJson(), token }
  }

  public static async findById(id: string): Promise<User> {
    const document = await UserModel.findById(id);
    if (!document)
      throw new NotFoundException('User');
    return new User(document);
  }

  public static async findByUsername(username: string): Promise<User> {
    const document = await UserModel.findOne({ username });
    if (!document)
      throw new NotFoundException('User');
    return new User(document);
  }

  public static async findByEmail(email: string): Promise<User> {
    const document = await UserModel.findOne({ email });
    if (!document)
      throw new NotFoundException('User');
    return new User(document);
  }

  public static async create(buffer: INewUserBuffer): Promise<User> {
    const {
      firstname,
      lastname,
      username,
      password,
      email,
      role,
    } = buffer;

    const { salt, hash } = await User.generateSaltAndHash(password);
    const document = await UserModel.create({
      firstname,
      lastname,
      username,
      email,
      salt,
      hash,
      role: role || 'user'
    });

    return new User(document);
  }

  public static async deleteById(id: string): Promise<User> {
    const document = await UserModel.deleteOne({ id })
    return new User(document);
  }

}
