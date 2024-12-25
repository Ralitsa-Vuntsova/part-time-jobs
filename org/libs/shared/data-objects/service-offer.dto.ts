import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { AdDto } from './ad.dto';

@Schema({ collection: 'service-offers', timestamps: true })
export class ServiceOffer extends AdDto {}

export const ServiceOfferSchema = SchemaFactory.createForClass(ServiceOffer);
export type ServiceOfferDocument = HydratedDocument<ServiceOffer>;

export class ServiceOfferDto extends ServiceOffer {}

export class CreateServiceOfferDto extends OmitType(ServiceOffer, [
  '_id',
  'isArchieved',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

export class EditServiceOfferDto extends OmitType(ServiceOfferDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}
