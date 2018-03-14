import { GraphQLString, GraphQLFieldConfig, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { UserService } from '../../services';
import { UserType } from '../types';
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';

interface FindUserByEmailArguments {
  email: string;
}

export class FindUserByEmailQuery extends AbstractQuery implements GraphQLFieldConfig<any, any>, IGraphQLQuery {
  private log = Logger('app:schemas:queries:FindUserByEmail');

  public type = UserType;
  public args = {
    email: { type: new GraphQLNonNull(GraphQLString) }
  }

  public before(
    context: Context<FindUserByEmailArguments>,
    args: FindUserByEmailArguments
  ): Promise<FindUserByEmailArguments> {
    this.log.debug('hook before args', args);
    return Promise.resolve(args);
  }

  public async execute(
    root: RootValue,
    args: FindUserByEmailArguments,
    context: Context<FindUserByEmailArguments>,
    info: GraphQLResolveInfo
  ): Promise<models.user.Attributes> {
    this.log.debug(`resolve findAuthorByEmail(${args.email})`);
    const user = await UserService.findByEmail(args.email);
    return user.toJson();
  }
}
