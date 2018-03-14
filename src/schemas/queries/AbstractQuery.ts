import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../../context';
import { RootValue } from '../../RootValue';

export interface IGraphQLQuery {
  allow: string[];
  before<A, S>(context: Context<A>, args: A, source?: S): Promise<A>;
  after<R, A, S>(result: R, context: Context<A>, args: A, source?: S): Promise<R>;
  execute<R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R>;
}

export class AbstractQuery {
  public allow: string[] = ['user'];

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

    if (!context.hasUserRoles(this.allow)) {
      context.response.send(401);
      return Promise.reject('401 Unauthorized');
    }

    args = await this.before(context, args);

    const result = await this.execute<R, A>(root, args, context, info);

    await this.after(result, context, args);

    return result;
  }
}
