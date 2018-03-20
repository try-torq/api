import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLID } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context, AuthRole } from '../../context';
import { CarPostCommentType, CarPostFavoriteType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarPostFavoriteService, INewCarPostFavoriteBuffer } from '../../services';

export interface FavoritePostArguments extends INewCarPostFavoriteBuffer { }

export class FavoritePostMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:CreateCarPostMutation');
  public type = CarPostFavoriteType;
  public minRole = AuthRole.user;
  public args = {
    post: { type: new GraphQLNonNull(GraphQLID) },
  }

  public async execute(
    root: RootValue,
    args: FavoritePostArguments,
    context: Context<FavoritePostArguments>,
  ): Promise<models.carPost.Attributes> {
    const fav = await CarPostFavoriteService.create({
      ...args,
      user: context.user.id
    });

    return fav.toJson();
  }
}
