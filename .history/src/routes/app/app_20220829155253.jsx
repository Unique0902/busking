import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <section className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <header>
          <div className={styles.playlists}></div>
          <div className={styles.users}></div>
        </header>
        <Outlet />
      </main>
    </section>
  );
}

export default App;
