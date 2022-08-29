import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/app/app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/login/login';
import App_home from './routes/app/app_home/app_home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='app' element={<App />}>
          <Route path='home' element={<App_home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
