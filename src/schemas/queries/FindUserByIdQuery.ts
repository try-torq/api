import { GraphQLID, GraphQLFieldConfig, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { UserService } from '../../services';
import { UserType } from '../types';
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';

interface IIdArguments {
  id: string;
}

export class FindUserByIdQuery extends AbstractQuery implements GraphQLFieldConfig<any, any>, IGraphQLQuery {
  private log = Logger('app:schemas:queries:FindUserById');

  public type = UserType;
  public args = {
    id: { type: new GraphQLNonNull(GraphQLID) }
  }

  public before(context: Context<IIdArguments>, args: IIdArguments): Promise<IIdArguments> {
    this.log.debug('hook before args', args);
    return Promise.resolve(args);
  }

  public async execute(root: RootValue, args: IIdArguments, context: Context<IIdArguments>, info: GraphQLResolveInfo): Promise<models.user.Attributes> {
    this.log.debug('resolve findAuthorById(%s)', args.id);
    const user = await UserService.findById(args.id);
    return user.toJson();
  }
}
