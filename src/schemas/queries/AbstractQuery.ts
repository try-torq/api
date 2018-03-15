import { GraphQLResolveInfo } from 'graphql';

import { Context, AuthRole } from '../../context';
import { RootValue } from '../../RootValue';
import { UnauthorizedException } from '../../exceptions';

export interface IGraphQLQuery {
  minRole: AuthRole;
  before<A, S>(context: Context<A>, args: A, source?: S): Promise<A>;
  after<R, A, S>(result: R, context: Context<A>, args: A, source?: S): Promise<R>;
  execute<R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R>;
}

export class AbstractQuery {
  public minRole = AuthRole.none;

  public before<A, S>(context: Context<A>, args: A, source?: S): Promise<A> {
    return Promise.resolve(args);
  }

  public execute<R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R> {
    return undefined;
  }

  public after<R, A, S>(result: R, context: Context<A>, args?: A, source?: S): Promise<R> {
    return Promise.resolve(result);
  }

  public resolve = async <R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R> => {
    context.args = args;

    if (this.minRole > context.user.authRole)
      throw new UnauthorizedException('Insufficient privileges for this query/mutation');

    args = await this.before(context, args);

    const result = await this.execute<R, A>(root, args, context, info);

    await this.after(result, context, args);

    return result;
  }
}
