import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context, AuthRole } from '../../context';
import { CarPostType, SaleStatusType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarPostService, INewCarPostBuffer } from '../../services';

export interface CreateCarPostArguments extends INewCarPostBuffer { }

export class CreateCarPostMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:CreateCarPostMutation');
  public type = CarPostType;
  public minRole = AuthRole.user;
  public args = {
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    carModelName: { type: new GraphQLNonNull(GraphQLString) },
    carMakeName: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    year: { type: new GraphQLNonNull(GraphQLInt) },
    saleStatus: { type: new GraphQLNonNull(SaleStatusType) },
    price: { type: GraphQLFloat },
  }

  public async execute(
    root: RootValue,
    args: CreateCarPostArguments,
    context: Context<CreateCarPostArguments>,
  ): Promise<models.carPost.Attributes> {
    const post = await CarPostService.create({ ...args, owner: context.user.id });
    return post.toJson();
  }
}
