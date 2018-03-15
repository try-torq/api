import { GraphQLNonNull, GraphQLString } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { AuthenticationBufferType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarPostService, INewCarPostBuffer, UserService } from '../../services';
import { IUserAuthenticationBuffer  } from '../../models';

export interface LoginArguments {
  username: string;
  password: string;
}

export class LoginMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:LoginMutation');
  public type = AuthenticationBufferType;
  public args = {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }

  public async execute(
    root: RootValue,
    args: LoginArguments,
    context: Context<LoginArguments>,
  ): Promise<IUserAuthenticationBuffer> {
    return await UserService.authenticate(args.username, args.password);
  }
}
