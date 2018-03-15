
import { UnauthorizedException } from '../../exceptions';
import { Context, AuthRole } from '../../context';

export interface IGraphQLField {
  minRole: AuthRole;
  before<A, S>(context: Context<A>, args: A, source: S): Promise<A>;
  after<R, A, S>(result: R, context: Context<A>, args: A, source: S): Promise<R>;
  execute<R, A, S>(source: S, args: A, context: Context<A>): Promise<R>;
}

export class AbstractField {
  public minRole = AuthRole.none;

  public before<A, S>(context: Context<A>, args: A, source: S): Promise<A> {
    return Promise.resolve(args);
  }

  public after<R, A, S>(result: R, context: Context<A>, args: A, source: S): Promise<R> {
    return Promise.resolve(result);
  }

  public execute<R, A, S>(source: S, args: A, context: Context<A>): Promise<R> {
    return undefined;
  }

  public resolve = async <R, A, S>(source: S, args: A, context: Context<A>): Promise<R> => {

    if (this.minRole > context.user.authRole)
      throw new UnauthorizedException();

    args = await this.before(context, args, source);

    let result = await this.execute<R, A, S>(source, args, context);

    await this.after(result, context, args, source);

    return result;
  }

}
