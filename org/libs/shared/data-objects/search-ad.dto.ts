import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { AdDto } from './ad.dto';

@Schema({ collection: 'search-ads', timestamps: true })
export class SearchAd extends AdDto {}

export const SearchAdSchema = SchemaFactory.createForClass(SearchAd);
export type SearchAdDocument = HydratedDocument<SearchAd>;

export class SearchAdDto extends SearchAd {}

export class CreateSearchAdDto extends OmitType(SearchAd, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}
