import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Home } from './pages/home';
import { UserProvider } from './hooks/use-current-user';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { PrivateRoute } from './components/private-route';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './libs/theme';
import { ServiceOfferCreation } from './pages/service-offer-creation';
import { JobOfferCreation } from './pages/job-offer-creation';
import { DrawerLayout } from './components/drawer-layout';
import { EditProfile } from './pages/edit-profile';
import { Ad } from './pages/ad';
import { AdType } from './libs/ad-helper-functions';
import { MyAds } from './pages/my-ads';
import { UserPreferencesProvider } from './hooks/use-user-preferences';
import { useState } from 'react';
import { MyAccomplishments } from './pages/my-accomplishments';
import { Applications } from './pages/applications';
import { PersonalRatings } from './pages/personal-ratings';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = () =>
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');

      return newMode;
    });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<DrawerLayout toggleTheme={toggleTheme} />}>
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
            path="personal-ratings"
            element={
              <PrivateRoute>
                <PersonalRatings />
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

          <Route path="offer-service-ads">
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <Ad type={AdType.Service} />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="seek-service"
            element={
              <PrivateRoute>
                <JobOfferCreation />
              </PrivateRoute>
            }
          />

          <Route path="seek-service-ads">
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <Ad type={AdType.Job} />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="my-ads"
            element={
              <PrivateRoute>
                <MyAds />
              </PrivateRoute>
            }
          />

          <Route
            path="my-accomplishments"
            element={
              <PrivateRoute>
                <MyAccomplishments />
              </PrivateRoute>
            }
          />

          <Route
            path="applications"
            element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/" replace />} />
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
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <UserProvider>
        <UserPreferencesProvider>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
        </UserPreferencesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
