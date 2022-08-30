import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import App_header from '../../components/app_header/app_header';
import { useEffect } from 'react';

function App({ authService, navigate }) {
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        console.log('hi');
      } else {
        navigate('/');
      }
    });
  });
  return (
    <section className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <App_header />
        <Outlet />
      </main>
    </section>
  );
}

export default App;
