import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import App_header from '../../components/app_header/app_header';

function App() {
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
