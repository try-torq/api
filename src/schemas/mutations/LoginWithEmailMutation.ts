import { GraphQLNonNull, GraphQLString } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { AuthenticationBufferType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarPostService, INewCarPostBuffer, UserService } from '../../services';
import { IUserAuthenticationBuffer  } from '../../models';

export interface LoginWithEmailArguments {
  email: string;
  password: string;
}

export class LoginWithEmailMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:LoginWithEmailMutation');
  public type = AuthenticationBufferType;
  public args = {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }

  public async execute(
    root: RootValue,
    args: LoginWithEmailArguments,
    context: Context<LoginWithEmailArguments>,
  ): Promise<IUserAuthenticationBuffer> {
    return await UserService.authenticateWithEmail(args.email, args.password);
  }
}
