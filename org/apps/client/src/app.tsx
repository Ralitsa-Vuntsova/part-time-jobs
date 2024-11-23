import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Home } from './pages/home';
import { UserProvider } from './hooks/use-current-user';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { PrivateRoute } from './components/private-route';

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index
          path="/"
          element={
            <UserProvider>
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            </UserProvider>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    ),
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}
