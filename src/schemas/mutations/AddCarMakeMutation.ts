import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { ValidationException } from '../../exceptions';
import { CarMakeType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarMakeService } from '../../services';

export interface AddCarMakeArguments {
  name: string;
}

export class AddCarMakeMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:AddCarMakeMutation')
  public type = CarMakeType;
  public args = {
    name: { type: new GraphQLNonNull(GraphQLString) }
  }

  public async execute(
    root: RootValue,
    args: AddCarMakeArguments,
    context: Context<AddCarMakeArguments>
  ): Promise<models.carMake.Attributes> {
    const carMake = await CarMakeService.create(args);
    return carMake.toJson();
  }
}
