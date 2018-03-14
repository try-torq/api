import * as Express from 'express';

export interface IUserClaims {
  id: string;
  email: string;
  username: string;
  role: string;
}

export class UserContext {
  private claims?: IUserClaims;

  constructor(private request: Express.Request) {
    this.claims = (request as any).user as IUserClaims;
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
