import { notificationService } from '../services/notification-service';
import { useAsync } from './use-async';

export function useNotifications() {
  return useAsync(
    async ({ signal }) => notificationService.listForUser(signal),
    []
  );
}
