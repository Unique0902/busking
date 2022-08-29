import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';

function App() {
  return (
    <main className={styles.app}>
      <Sidebar />
      <section>
        <header>
          <div className={styles.playlists}></div>
          <div className={styles.users}></div>
        </header>
        <section>
          <h1>playlist 1</h1>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <button>버스킹 하러 가기</button>
        </section>
      </section>
    </main>
  );
}

export default App;
