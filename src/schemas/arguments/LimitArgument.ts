import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { validatePositiveInteger } from '../../utils';
import { ValidationException } from '../../exceptions';

export class LimitArgument implements GraphQLArgumentConfig {
  public type = GraphQLInt;
  public description = 'This argument limits the number of results returned.';
  public defaultValue = 0;

  public static validate(limit: number): void {
    try {
      validatePositiveInteger(limit);
    } catch (err) { throw err; }
  }

}
