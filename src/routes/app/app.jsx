import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';

function App() {
  return (
    <section className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <header>
          <div className={styles.playlists}></div>
          <div className={styles.users}></div>
        </header>
        <section className={styles.analytic}>
          <h2>지금까지 12명에게 노래를 받았어요!</h2>
          <h2>당신이 버스킹한 횟수는 5번 입니다!</h2>
          <h2>주요 버스킹 방법: 온라인</h2>
        </section>
        <section>
          <h1>playlist 1</h1>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p>......</p>
          <button>버스킹 하러 가기</button>
        </section>
      </main>
    </section>
  );
}

export default App;
