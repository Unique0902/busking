import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/app/app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/login/login';
import App_home from './routes/app/app_home/app_home';
import App_add from './routes/app/app_add/app_add';
import App_makebusking from './routes/app/app_makebusking/app_makebusking';
import App_inform from './routes/app/app_inform/app_inform';
import App_playlist from './routes/app/app_playlist/app_playlist';
import App_setting from './routes/app/app_setting/app_setting';
import axios from 'axios';
import Lastfm from './service/lastfm';
import AuthService from './service/auth_service';
import PlaylistRepository from './service/playlist_repository';
import UserRepository from './service/userRepository';
import MakeUser from './routes/makeUser/makeUser';
import App_busking from './routes/app/app_busking/app_busking';
import BuskingRepository from './service/buskingRepository';
import Apply from './routes/apply/apply';

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
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Login authService={authService} userRepository={userRepository} />
          }
        />
        <Route
          path='makeUser'
          element={
            <MakeUser
              authService={authService}
              userRepository={userRepository}
            />
          }
        />
        <Route path='apply'>
          <Route
            path=':userId'
            element={
              <Apply
                buskingRepository={buskingRepository}
                userRepository={userRepository}
                playlistRepository={playlistRepository}
              />
            }
          />
        </Route>
        <Route
          path='app'
          element={
            <App
              authService={authService}
              userRepository={userRepository}
              playlistRepository={playlistRepository}
              buskingRepository={buskingRepository}
            />
          }
        >
          <Route path='home' element={<App_home />} />
          <Route
            path='add'
            element={
              <App_add
                playlistRepository={playlistRepository}
                lastfm={lastfm}
              />
            }
          />
          <Route
            path='makebusking'
            element={<App_makebusking buskingRepository={buskingRepository} />}
          />
          <Route path='inform' element={<App_inform />} />
          <Route path='playlist' element={<App_playlist />} />
          <Route path='setting' element={<App_setting />} />
          <Route
            path='busking'
            element={<App_busking buskingRepository={buskingRepository} />}
          />{' '}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
