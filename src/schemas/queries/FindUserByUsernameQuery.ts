import { GraphQLString, GraphQLFieldConfig, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { UserService } from '../../services';
import { UserType } from '../types';
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';

interface FindUserByUsernameArguments {
  username: string;
}

export class FindUserByUsernameQuery extends AbstractQuery implements GraphQLFieldConfig<any, any>, IGraphQLQuery {
  private log = Logger('app:schemas:queries:FindUserByUsername');

  public type = UserType;
  public args = {
    username: { type: new GraphQLNonNull(GraphQLString) }
  }

  public before(context: Context<FindUserByUsernameArguments>, args: FindUserByUsernameArguments): Promise<FindUserByUsernameArguments> {
    this.log.debug('hook before args', args);
    return Promise.resolve(args);
  }

  public async execute(root: RootValue, args: FindUserByUsernameArguments, context: Context<FindUserByUsernameArguments>, info: GraphQLResolveInfo): Promise<models.user.Attributes> {
    this.log.debug(`resolve findAuthorByUsername(${args.username})`);
    const user = await UserService.findByUsername(args.username);
    return user.toJson();
  }
}
