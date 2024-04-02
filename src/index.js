import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/login/login';
import axios from 'axios';
import Lastfm from './service/lastfm';
import AuthService from './service/auth_service';
import PlaylistRepository from './service/playlist_repository';
import UserRepository from './service/userRepository';
import BuskingRepository from './service/buskingRepository';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserDataContextProvider } from './context/UserDataContext';
import UserDataProtectedRoute from './routes/UserDataProtectedRoute';
import { PlaylistContextProvider } from './context/PlaylistContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const App = React.lazy(() => import('./routes/app/app'));
const AppHome = React.lazy(() => import('./routes/app/AppHome'));
const AppAdd = React.lazy(() => import('./routes/app/AppAdd'));
const AppMakeBusking = React.lazy(() => import('./routes/app/AppMakeBusking'));
const AppInform = React.lazy(() => import('./routes/app/AppInform'));
const AppPlaylist = React.lazy(() => import('./routes/app/AppPlaylist'));
const AppBusking = React.lazy(() => import('./routes/app/AppBusking'));
const MakeUser = React.lazy(() => import('./routes/makeUser/makeUser'));

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
const httpClient = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0',
  params: { api_key: process.env.REACT_APP_LASTFM_API_KEY },
});
const lastfm = new Lastfm(httpClient);
const authService = new AuthService();
const userRepository = new UserRepository();
const playlistRepository = new PlaylistRepository();
const buskingRepository = new BuskingRepository();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authService={authService}>
        <UserDataContextProvider userRepository={userRepository}>
          <PlaylistContextProvider playlistRepository={playlistRepository}>
            <BrowserRouter>
              <Routes>
                <Route
                  path=''
                  element={<Login userRepository={userRepository} />}
                />
                <Route
                  path='makeUser'
                  element={
                    <React.Suspense fallback={<p>로딩...</p>}>
                      <ProtectedRoute>
                        <MakeUser userRepository={userRepository} />
                      </ProtectedRoute>
                    </React.Suspense>
                  }
                />
                <Route
                  path='app'
                  element={
                    <React.Suspense fallback={<p>로딩...</p>}>
                      <ProtectedRoute>
                        <UserDataProtectedRoute>
                          <App />
                        </UserDataProtectedRoute>
                      </ProtectedRoute>
                    </React.Suspense>
                  }
                >
                  <Route
                    path='home'
                    element={
                      <React.Suspense fallback={<p>로딩...</p>}>
                        <AppHome />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='add'
                    element={
                      <React.Suspense fallback={<p>로딩...</p>}>
                        <AppAdd lastfm={lastfm} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='makebusking'
                    element={
                      <React.Suspense fallback={<p>로딩...</p>}>
                        <AppMakeBusking buskingRepository={buskingRepository} />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='inform'
                    element={
                      <React.Suspense fallback={<p>로딩...</p>}>
                        <AppInform
                          userRepository={userRepository}
                          playlistRepository={playlistRepository}
                          buskingRepository={buskingRepository}
                        />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='playlist'
                    element={
                      <React.Suspense fallback={<p>로딩...</p>}>
                        <AppPlaylist />
                      </React.Suspense>
                    }
                  />
                  <Route
                    path='busking'
                    element={
                      <React.Suspense fallback={<p>로딩...</p>}>
                        <AppBusking buskingRepository={buskingRepository} />
                      </React.Suspense>
                    }
                  />{' '}
                </Route>
              </Routes>
            </BrowserRouter>
          </PlaylistContextProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
