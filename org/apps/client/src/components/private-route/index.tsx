import { Navigate, RouteProps } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/use-current-user';

export function PrivateRoute({ children }: RouteProps) {
  const user = useCurrentUser();

  return user ? children : <Navigate to="/login" />;
}
