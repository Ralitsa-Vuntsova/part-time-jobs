import { userService } from '../services/user-service';
import { useAsync } from './use-async';

export function useUsers(ids: string[]) {
  return useAsync(async ({ signal }) => userService.listByIds(ids, signal), []);
}
