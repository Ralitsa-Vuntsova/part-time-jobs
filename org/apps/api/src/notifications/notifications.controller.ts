import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthUser, CreateNotificationDto } from '@shared/data-objects';
import { User } from '../decorators/user-decorator';
import { NotificationGateway } from './notification.gateway';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationService: NotificationsService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendNotification(
    @Body() notification: CreateNotificationDto,
    @User() user: AuthUser
  ) {
    const newNotification = await this.notificationService.create(
      notification,
      user.userId
    );

    // Emit the notification to the specific user
    this.notificationGateway.server
      .to(newNotification.userId)
      .emit('newNotification', newNotification);

    return newNotification;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserNotifications(@User() user: AuthUser) {
    return this.notificationService.getUserNotifications(user.userId);
  }

  @Patch(':notificationId/read')
  @UseGuards(JwtAuthGuard)
  markAsRead(
    @Param('notificationId') notificationId: string,
    @User() user: AuthUser
  ) {
    return this.notificationService.markAsRead(notificationId, user.userId);
  }
}
