import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationSchema, Notification } from '@shared/data-objects';
import { NotificationsController } from './notifications.controller';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationGateway],
})
export class NotificationsModule {}
