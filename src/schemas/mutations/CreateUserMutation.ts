import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { ValidationException } from '../../exceptions';
import { UserType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { UserService } from '../../services';

export interface CreateUserArguments {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export class CreateUserMutation extends AbstractMutation implements IGraphQLMutation {
  public type = UserType;
  public args = {
    firstname: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  };

  public async execute(
    root: RootValue,
    args: CreateUserArguments,
    context: Context<CreateUserArguments>
  ): Promise<models.user.Attributes> {
    const user = await UserService.create(args);
    return user.toJson();
  }
}
