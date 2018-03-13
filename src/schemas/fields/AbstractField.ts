import { UnauthorizedException, ValidationException } from '../../exceptions';
import { Context } from '../../context';

export interface IGraphQLField {
  // array of roles with access to the field
  allow: string[];
  // before query|mutation hook
  before<A, S>(context: Context<A>, args: A, source: S): Promise<A>;
  // fetch|mutate data from query|mutation
  execute<R, A, S>(context: Context<A>, args: A, source: S): Promise<A>;
  // after query|mutation hook
  after<R, A, S>(result: R, context: Context<A>, args: A, source: S): Promise<A>;
}

export class AbstractField {
  public allow: string[] = [];

  public before<A, S>(context: Context<A>, args: A, source: S): Promise<A> {
    return Promise.resolve(args);
  }

  public execute<R, A, S>(context: Context<A>, args: A, source: S): Promise<R> {
    return undefined;
  }

  // public after<R, A, S>(result: R, context: Context<A>, args: A, source: S): Promise<A> {
  //   return Promise.resolve(result);
  // }

  public async resolve<R, A, S>(source: S, args: A, context: Context<A>): Promise<R> {
    if (!context.hasUserRoles(this.allow)) {
      const exception = new ValidationException();
      context.response
        .status(401)
        .json(exception.toJson())
      
      return Promise.reject(exception);
    }

    args = await this.before(context, args, source);

    const result = await this.execute<R, A, S>(context, args, source);
    
    // await this.after(result, context, args, source);

    return result;
  }
}
