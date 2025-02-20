import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateNotificationDto,
  Notification,
  NotificationDocument,
  NotificationDto,
} from '@shared/data-objects';
import { ExtendedModel } from '../lib/db-utils/extended-model';
import { dbToInstance } from '../lib/utils';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: ExtendedModel<NotificationDocument>
  ) {}

  create(
    createNotification: CreateNotificationDto,
    userId: string
  ): Promise<NotificationDto> {
    return dbToInstance(
      NotificationDto,
      this.notificationModel.createExtended({ ...createNotification }, userId)
    );
  }

  getUserNotifications(userId: string): Promise<NotificationDto[]> {
    return this.notificationModel.find({ userId }).sort({ createdAt: -1 });
  }

  markAsRead(notificationId: string, userId: string): Promise<NotificationDto> {
    return this.notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      {
        returnDocument: 'after',
        user: userId,
      }
    );
  }
}
