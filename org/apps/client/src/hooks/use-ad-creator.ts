import { useUsers } from './use-users';

export function useUserCreator(createdBy: string) {
  const { data: users } = useUsers();

  return users?.find(({ _id }) => _id === createdBy);
}
