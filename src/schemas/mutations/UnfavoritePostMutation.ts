import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLID } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context, AuthRole } from '../../context';
import { CarPostCommentType, CarPostFavoriteType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarPostFavoriteService, INewCarPostFavoriteBuffer } from '../../services';

export interface UnfavoritePostArguments extends INewCarPostFavoriteBuffer { }

export class UnfavoritePostMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:CreateCarPostMutation');
  public type = CarPostFavoriteType;
  public minRole = AuthRole.user;
  public args = {
    post: { type: new GraphQLNonNull(GraphQLID) },
  }

  public async execute(
    root: RootValue,
    args: UnfavoritePostArguments,
    context: Context<UnfavoritePostArguments>,
  ): Promise<models.carPost.Attributes> {
    const fav = await CarPostFavoriteService.findAndDelete(context.user.id, args.post);
    return fav.toJson();
  }
}
