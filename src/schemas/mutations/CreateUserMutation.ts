import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { ValidationException } from '../../exceptions';
import { UserType } from '../types';
// import { AuthorModel } from '../../models';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { UserService } from '../../services';

export interface ICreateUserMutationArguments {
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
  }

  public before(context: Context<ICreateUserMutationArguments>, args: ICreateUserMutationArguments): Promise<ICreateUserMutationArguments> {
    return Promise.resolve(args);
  }

  public async execute(
    root: RootValue,
    args: ICreateUserMutationArguments,
    context: Context<ICreateUserMutationArguments>
  ): Promise<models.user.Attributes> {
    console.log(args);
    const user = await UserService.create(args);
    return user.toJson();
  }
}
