import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitType, PartialType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { AdDto } from './ad.dto';

@Schema({ collection: 'service-offers', timestamps: true })
export class ServiceOffer extends AdDto {}

export const ServiceOfferSchema = SchemaFactory.createForClass(ServiceOffer);
export type ServiceOfferDocument = HydratedDocument<ServiceOffer>;

export class ServiceOfferDto extends ServiceOffer {}

export class CreateServiceOfferDto extends OmitType(ServiceOffer, [
  '_id',
  'archiveReason',
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
]) {}

export class EditServiceOfferDto extends PartialType(ServiceOfferDto) {}
