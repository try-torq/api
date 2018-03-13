import * as Express from 'express';

import { UserContext } from './UserContext';

export class Context<A> {
  // stores the resolve args
  private $args: A;
  private user: UserContext;

  constructor(
    private $request: Express.Request,
    private $response: Express.Response,
  ) {
    this.user = new UserContext($request);
  }

  public get args(): A {
    return this.args;
  }

  public get request(): Express.Request {
    return this.$request;
  }

  public get response(): Express.Response {
    return this.$response;
  }

  public hasUserRoles(roles: string[]): boolean {
    // check to see if user has permission to query/
    // mutate this data
    return roles
      .map(role => this.user.role === role)
      .filter(flag => Boolean(flag))
      .length >= 1
  }

  public set resolveArguments(value: A): void {
    this.$args = value;
  }
}
