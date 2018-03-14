import { GraphQLList, GraphQLFieldConfig, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { UserService } from '../../services';
import { UserType } from '../types';
import { OffsetArgument, LimitArgument } from '../arguments'
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';

interface FindAllUsersArguments {
  limit: number;
  offset: number;
}

export class FindAllUsersQuery extends AbstractQuery implements GraphQLFieldConfig<any, any>, IGraphQLQuery {
  private log = Logger('app:schemas:queries:FindAllUsersQuery');
  public type = new GraphQLList(UserType)
  public args = {
    limit: new LimitArgument(),
    offset: new OffsetArgument(),
  }

  public async execute(
    root: RootValue,
    args: FindAllUsersArguments,
    context: Context<FindAllUsersArguments>,
    info: GraphQLResolveInfo
  ): Promise<models.user.Attributes> {
    this.log.debug(`resolve findAllUsers()`);
    const users = await UserService.findAll(args);
    return users.map(user => user.toJson());
  }
}
