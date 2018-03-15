import * as Express from 'express';
import { Logger } from '../core';

export interface IUserClaims {
  id: string;
  email: string;
  username: string;
  role: string;
}

export enum AuthRole {
  none = 1,
  user = 2,
  mod = 3,
  admin = 4
}

export class UserContext {
  private static log = Logger('app:context:UserContext')
  private claims?: IUserClaims;
  public authRole: AuthRole;

  constructor(private request: Express.Request) {
    this.claims = (request as any).user as IUserClaims;
    this.authRole = (request as any).authStatus as AuthRole;
  }

  public get id(): string {
    return this.claims.id;
  }

  public get email(): string {
    return this.claims.email;
  }

  public get username(): string {
    return this.claims.id;
  }

  public get role(): string {
    return this.claims.role;
  }

  public get isAuthenticated(): boolean {
    return !this.claims;
  }
}
