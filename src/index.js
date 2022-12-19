import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/app/app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/login/login';
import AppHome from './routes/app/AppHome';
import AppAdd from './routes/app/AppAdd';
import AppMakeBusking from './routes/app/AppMakeBusking';
import AppInform from './routes/app/AppInform';
import AppPlaylist from './routes/app/AppPlaylist';
import axios from 'axios';
import Lastfm from './service/lastfm';
import AuthService from './service/auth_service';
import PlaylistRepository from './service/playlist_repository';
import UserRepository from './service/userRepository';
import MakeUser from './routes/makeUser/makeUser';
import AppBusking from './routes/app/AppBusking';
import BuskingRepository from './service/buskingRepository';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserDataContextProvider } from './context/UserDataContext';
import UserDataProtectedRoute from './routes/UserDataProtectedRoute';
import { PlaylistContextProvider } from './context/PlaylistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
    <AuthContextProvider authService={authService}>
      <UserDataContextProvider userRepository={userRepository}>
        <PlaylistContextProvider playlistRepository={playlistRepository}>
          <BrowserRouter>
            <Routes>
              <Route path='busking'>
                <Route
                  path=''
                  element={<Login userRepository={userRepository} />}
                />
                <Route
                  path='makeUser'
                  element={
                    <ProtectedRoute>
                      <MakeUser userRepository={userRepository} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='app'
                  element={
                    <ProtectedRoute>
                      <UserDataProtectedRoute>
                        <App />
                      </UserDataProtectedRoute>
                    </ProtectedRoute>
                  }
                >
                  <Route path='home' element={<AppHome />} />
                  <Route
                    path='add'
                    element={
                      <AppAdd
                        playlistRepository={playlistRepository}
                        lastfm={lastfm}
                      />
                    }
                  />
                  <Route
                    path='makebusking'
                    element={
                      <AppMakeBusking buskingRepository={buskingRepository} />
                    }
                  />
                  <Route
                    path='inform'
                    element={
                      <AppInform
                        userRepository={userRepository}
                        playlistRepository={playlistRepository}
                        buskingRepository={buskingRepository}
                      />
                    }
                  />
                  <Route path='playlist' element={<AppPlaylist />} />
                  <Route
                    path='busking'
                    element={
                      <AppBusking buskingRepository={buskingRepository} />
                    }
                  />{' '}
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PlaylistContextProvider>
      </UserDataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
