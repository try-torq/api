import { GraphQLList, GraphQLFieldConfig, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { CarMakeService } from '../../services';
import { CarMakeType } from '../types';
import { OffsetArgument, LimitArgument } from '../arguments'
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';

interface FindAllCarMakesArguments {
  limit: number;
  offset: number;
}

export class FindAllCarMakesQuery extends AbstractQuery implements GraphQLFieldConfig<any, any>, IGraphQLQuery {
  private log = Logger('app:schemas:queries:FindAllCarMakesQuery');
  public type = new GraphQLList(CarMakeType)
  public args = {
    limit: new LimitArgument(),
    offset: new OffsetArgument(),
  }

  public async execute(
    root: RootValue,
    args: FindAllCarMakesArguments,
    context: Context<FindAllCarMakesArguments>,
    info: GraphQLResolveInfo
  ): Promise<models.carMake.Attributes> {
    this.log.debug(`resolve findAllCarMakes()`);
    const makes = await CarMakeService.findAll();
    return makes.map(make => make.toJson());
  }
}
