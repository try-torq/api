import { GraphQLFieldConfig, GraphQLField } from 'graphql';
import { DateType } from '../types';

export class JoinedAtField implements GraphQLField<any, any> {
  public type = DateType;
  public name = 'joinedAt';
  public description = 'The date the user joined Torq.';
  public args;
}
