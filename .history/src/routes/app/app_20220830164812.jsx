import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import App_header from '../../components/app_header/app_header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App({ authService }) {
  let navigate = useNavigate();
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
      } else {
        navigate('/');
      }
    });
  });
  return (
    <section className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <App_header authService={authService} />
        <Outlet />
      </main>
    </section>
  );
}

export default App;
