import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { validatePositiveInteger } from '../../utils';
import { ValidationException } from '../../exceptions';

export class OffsetArgument implements GraphQLArgumentConfig {
  public type = GraphQLInt;
  public description = 'This argument denotes the amount of results to offest from when querying.';
  public defaultValue = 0;

  public static validate(offset: number): void {
    try {
      validatePositiveInteger(offset);
    } catch (err) { throw err; }
  }

}
