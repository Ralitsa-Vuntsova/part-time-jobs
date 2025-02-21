import { userService } from '../services/user-service';
import { useAsync } from './use-async';

export function useUserById(id: string) {
  return useAsync(async ({ signal }) => userService.getById(id, signal), []);
}
