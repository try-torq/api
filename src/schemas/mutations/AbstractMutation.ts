import { AbstractQuery, IGraphQLQuery } from '../queries';

export interface IGraphQLMutation extends IGraphQLQuery { }

export class AbstractMutation extends AbstractQuery { }
