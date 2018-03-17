import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { ValidationException } from '../../exceptions';
import { AuthenticationBufferType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { UserService } from '../../services';
import { IUserAuthenticationBuffer } from '../../models';

export interface CreateUserArguments {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export class CreateUserMutation extends AbstractMutation implements IGraphQLMutation {
  public type = AuthenticationBufferType;
  public args = {
    firstname: { type: new GraphQLNonNull(GraphQLString) },
    lastname: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl: { type: GraphQLString },
  };

  public async execute(
    root: RootValue,
    args: CreateUserArguments,
    context: Context<CreateUserArguments>
  ): Promise<IUserAuthenticationBuffer> {
    const user = await UserService.create(args);
    return {
      user: user.toJson(),
      token: user.genToken()
    };
  }
}
