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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './libs/theme';
import { ServiceOfferCreation } from './pages/service-offer-creation';
import { JobOfferCreation } from './pages/job-offer-creation';
import { DrawerLayout } from './components/drawer-layout';
import { EditProfile } from './pages/edit-profile';

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<DrawerLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="offer-service"
            element={
              <PrivateRoute>
                <ServiceOfferCreation />
              </PrivateRoute>
            }
          />

          <Route
            path="offer-job"
            element={
              <PrivateRoute>
                <JobOfferCreation />
              </PrivateRoute>
            }
          />
        </Route>

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
    <ThemeProvider theme={theme}>
      <UserProvider>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </UserProvider>
    </ThemeProvider>
  );
}
