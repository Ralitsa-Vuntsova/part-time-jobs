import { userService } from '../services/user-service';
import { useAsync } from './use-async';

export function useUsers() {
  return useAsync(async ({ signal }) => userService.listAll(signal), []);
}
