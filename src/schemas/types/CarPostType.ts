import { GraphQLObjectType, GraphQLEnumType } from 'graphql';

import {
  IdField,
  NameField,
  YearField,
  SaleStatusField,
  OwnerField,
  CarModelField,
  TagsField,
  PictureUrlsField,
  PrimaryPictureIndexField,
} from '../fields';

export const CarPostType = new GraphQLObjectType({
  name: 'CarPost',
  description: 'A post about a car/car sale.',
  fields: () => ({
    id: new IdField(),
    nickname: new NameField(),
    carModel: new CarModelField(),
    owner: new OwnerField(),
    tags: new TagsField(),
    year: new YearField(),
    saleStatus: new SaleStatusField(),
    pictureUrls: new PictureUrlsField(),
    primaryPictureIndex: new PrimaryPictureIndexField(),
  })
});
