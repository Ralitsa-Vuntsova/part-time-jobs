import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/use-current-user';

export function PrivateRoute({ children }: RouteProps) {
  const user = useCurrentUser();
  const location = useLocation();

  return user ? children : <Navigate to="/login" state={{ from: location }} />;
}
