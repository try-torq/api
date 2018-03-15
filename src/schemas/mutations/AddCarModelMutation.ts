import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context, AuthRole } from '../../context';
import { ValidationException } from '../../exceptions';
import { CarModelType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';
import { CarModelService, INewCarModelBuffer } from '../../services';

export interface AddCarModelArguments extends INewCarModelBuffer { }

export class AddCarModelMutation extends AbstractMutation implements IGraphQLMutation {
  private log = Logger('app:schemas:mutations:AddCarMakeMutation')
  public type = CarModelType;
  public minRole = AuthRole.admin;
  public args = {
    name: { type: new GraphQLNonNull(GraphQLString) },
    firstYear: { type: new GraphQLNonNull(GraphQLInt) },
    lastYear: { type: GraphQLInt },
    makeName: { type: new GraphQLNonNull(GraphQLString) }
  }

  public async execute(
    root: RootValue,
    args: AddCarModelArguments,
    context: Context<AddCarModelArguments>
  ): Promise<models.carModel.Attributes> {
    const carModel = await CarModelService.create(args);
    return carModel.toJson();
  }
}
