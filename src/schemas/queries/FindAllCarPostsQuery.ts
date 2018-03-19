import { GraphQLList, GraphQLFieldConfig, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { CarPostService } from '../../services';
import { CarPostType } from '../types';
import { OffsetArgument, LimitArgument } from '../arguments'
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';

interface FindAllCarPostsArguments {
  limit: number;
  offset: number;
}

export class FindAllCarPostsQuery extends AbstractQuery implements GraphQLFieldConfig<any, any>, IGraphQLQuery {
  private log = Logger('app:schemas:queries:FindAllCarPostsQuery');
  public type = new GraphQLList(CarPostType)
  public args = {
    limit: new LimitArgument(),
    offset: new OffsetArgument(),
  }

  public async execute(
    root: RootValue,
    args: FindAllCarPostsArguments,
    context: Context<FindAllCarPostsArguments>,
    info: GraphQLResolveInfo
  ): Promise<models.carPost.Attributes[]> {
    this.log.debug(`resolve findAllCarMakes()`);
    const makes = await CarPostService.findAll(args.offset, args.limit);
    return makes.map(make => make.toJson());
  }
}
