import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLID } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context, AuthRole } from '../../context';
import { CarPostCommentType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarPostCommentService, INewCarPostCommentBuffer } from '../../services';

export interface AddCommentArguments extends INewCarPostCommentBuffer { }

export class AddCommentMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:CreateCarPostMutation');
  public type = CarPostCommentType;
  public minRole = AuthRole.user;
  public args = {
    post: { type: new GraphQLNonNull(GraphQLID) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  }

  public async execute(
    root: RootValue,
    args: AddCommentArguments,
    context: Context<AddCommentArguments>,
  ): Promise<models.carPost.Attributes> {
    const comment = await CarPostCommentService.create({
      ...args,
      commenter: context.user.id
    });

    return comment.toJson();
  }
}
