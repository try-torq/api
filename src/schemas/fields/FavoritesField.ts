import { GraphQLField, GraphQLList } from 'graphql'

import { Logger } from '../../core';
import { Context } from '../../context';
import { CarPost } from '../../models'; 
import { AbstractField } from './AbstractField';
import { CarPostFavoriteType } from '../types';
import { CarPostFavoriteService } from '../../services';

export class FavoritesField extends AbstractField implements GraphQLField<CarPost | any, any> {
  private log = Logger('app:schemas:fields:FavoritesField');
  public type = new GraphQLList(CarPostFavoriteType);
  public name = 'carMake';
  public description = 'The Favorites.';
  public args;

  public async execute(
    source: CarPost,
    args: any,
    context: Context<any>
  ): Promise<models.carMake.Attributes>
  public async execute(
    source: any,
    args: any,
    context: Context<any>
  ): Promise<models.carPost.Attributes[]> {
    const favorites = await CarPostFavoriteService.findByPostId(source.id);
    return favorites.map(favorite => favorite.toJson())
  }
}
