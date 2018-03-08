import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';
import uniqueValidator from 'mongoose-unique-validator';

import { validateEmail, validatePassword, validateUsername } from '../utils'

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
    min: 3,
    max: 16,
    validate: validateUsername,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    min: 6,
    max: 255,
    validate: validateEmail,
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
  }
})

export interface IUser extends mongoose.Document {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  salt: string;
  hash: string;
  role: string;
}

interface ICipherSet {
  salt: string;
  hash: string;
}

export class User {
  constructor(private _user: IUser) {}

  public get id(): string {
    return this._user._id;
  }

  public get firstname(): string {
    return this._user.firstname;
  }

  public get lastname(): string {
    return this._user.lastname;
  }

  public get username(): string {
    return this._user.username;
  }

  public get email(): string {
    return this._user.email;
  }

  public get salt(): string {
    return this._user.salt;
  }

  public get hash(): string {
    return this._user.salt;
  }

  public get role(): string {
    return this._user.role;
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

  public set firstname(val: string) {
    this._user.firstname = val;
  }

  public set lastname(val: string) {
    this._user.lastname = val;
  }

  public set username(val: string) {
    this._user.username = val;
  }

  public set email(val: string) {
    this._user.email = val;
  }

  public set salt(val: string) {
    this._user.salt = val;
  }

  public set hash(val: string) {
    this._user.salt = val;
  }

  public genToken(): string {
    const { id, email, username, role } = this;
    const payload = { id, email, username, role };
    // TODO: - use prk/puk hs256 for secret
    return jwt.encode(payload, 'SECRET');
  }

  public async setPassword(password: string) {
    if (validatePassword(password)) {
      const { hash, salt } = await User.generateSaltAndHash(password);
      this.hash = hash;
      this.salt = salt;
    }
  }

  private static async generateSaltAndHash(password: string): Promise<ICipherSet> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return <ICipherSet>{ salt, hash };
  }
}

UserSchema.plugin(uniqueValidator);

export const UserModel = mongoose.model('User', UserSchema);
