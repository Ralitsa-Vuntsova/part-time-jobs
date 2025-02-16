import { useUsers } from './use-users';

export function useUserById(id: string) {
  const { data: users } = useUsers();

  return users?.find(({ _id }) => _id === id);
}
