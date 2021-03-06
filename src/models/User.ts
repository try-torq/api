import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as uniqueValidator from 'mongoose-unique-validator';

import { AbstractModel } from './AbstractModel';
import { validateEmail, validatePassword, validateUsername } from '../utils';
import { ICarPostDocument } from './CarPost';
import { Logger } from '../core';

export const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
    min: 1,
    max: 50,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    min: 1,
    max: 50,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    min: 3,
    max: 16,
    validate: validateUsername,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    min: 6,
    max: 255,
    validate: validateEmail,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'mod'],
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  carPosts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarPost'
  },
}, {
  timestamps: {
    createdAt: 'joinedAt'
  }
})

export interface IUserDocument extends mongoose.Document {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  avatarUrl: string;
  email: string;
  salt: string;
  hash: string;
  role: string;
  carPosts: string[];
  joinedAt: Date;
}

UserSchema.plugin(uniqueValidator);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export interface IUserAttributes {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  avatarUrl?: string;
  email?: string;
  salt?: string;
  hash?: string;
  joinedAt?: Date;
}

export interface IUserAuthenticationBuffer {
  user: models.user.Attributes;
  token: string;
}

interface ICipherSet {
  salt: string;
  hash: string;
}

export class User extends AbstractModel<IUserDocument> {

  private static log = Logger('app:models:User');

  public genToken(): string {
    const { id, email, username, role } = this;
    const payload = { id, email, username, role };
    // TODO: - use prk/puk hs256 for secret
    return jwt.sign(payload, 'SECRET');
  }

  public async setPassword(password: string) {
    if (validatePassword(password)) {
      const { hash, salt } = await User.generateSaltAndHash(password);
      this.hash = hash;
      this.salt = salt;
    }
  }

  public async checkPassword(attempt: string): Promise<boolean> {
    const { hash } = this;
    return await bcrypt.compare(attempt, hash);
  }

  public static async generateSaltAndHash(password: string): Promise<ICipherSet> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return <ICipherSet>{ salt, hash };
  }

  public get firstname(): string {
    return this._document.firstname;
  }

  public get lastname(): string {
    return this._document.lastname;
  }

  public get username(): string {
    return this._document.username;
  }

  public get email(): string {
    return this._document.email;
  }

  public get avatarUrl(): string {
    return this._document.avatarUrl;
  }

  private get salt(): string {
    return this._document.salt;
  }

  private get hash(): string {
    return this._document.hash;
  }

  public get role(): string {
    return this._document.role;
  }

  public get isAdmin(): boolean {
    return this.role === 'admin';
  }

  public get isMod(): boolean {
    return this.role === 'mod';
  }

  public get isUser(): boolean {
    return this.role === 'user';
  }

  public get fullname(): string {
    const { firstname, lastname } = this;
    return `${firstname} ${lastname}`;
  }

  public get joinedAt(): Date {
    return this._document.joinedAt;
  }

  public get carPosts(): string[] {
    return this._document.carPosts;
  }

  public set firstname(val: string) {
    this._document.firstname = val;
  }

  public set lastname(val: string) {
    this._document.lastname = val;
  }

  public set username(val: string) {
    this._document.username = val;
  }

  public set email(val: string) {
    this._document.email = val;
  }

  private set salt(val: string) {
    this._document.salt = val;
  }

  private set hash(val: string) {
    this._document.salt = val;
  }

  public toJson(): models.user.Attributes {
    const {
      id,
      firstname,
      lastname,
      username,
      avatarUrl,
      email,
      salt,
      hash,
      role,
      joinedAt,
      carPosts
    } = this;

    return {
      id,
      firstname,
      lastname,
      username,
      avatarUrl,
      email,
      salt,
      hash,
      role,
      joinedAt,
      carPosts
    };
  }

}
