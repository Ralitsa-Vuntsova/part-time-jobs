import { io } from 'socket.io-client';
import { HttpService } from './http-service';
import { CreateNotificationDto, NotificationDto } from '@shared/data-objects';
import { authService } from './auth-service';

export class NotificationService {
  private baseUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
  private http = new HttpService();

  private socket = io(this.baseUrl, {
    query: { userId: authService.persistedUser?._id },
  });

  listenForNotifications(callback: (notification: any) => void) {
    this.socket.on('newNotification', callback);
  }

  create(notification: CreateNotificationDto, abortSignal: AbortSignal) {
    return this.http.post('notifications', {
      body: notification,
      abortSignal,
    });
  }

  listForUser(abortSignal: AbortSignal) {
    return this.http.get<NotificationDto[]>('notifications', {
      abortSignal,
    });
  }

  markAsRead(notificationId: string, abortSignal: AbortSignal) {
    return this.http.patch(`notifications/${notificationId}/read`, {
      abortSignal,
    });
  }
}

export const notificationService = new NotificationService();
