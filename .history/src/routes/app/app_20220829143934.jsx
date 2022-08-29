import './app.module.css';
import styles from './app.module.css';

function App() {
  return (
    <main>
      <aside>
        <div className={styles.logo}>
          <img src='' alt='' />
          <p>노래책</p>
        </div>
        <ul>
          <li>
            <button>home</button>
          </li>
          <li>
            <button>노래검색</button>
          </li>
          <li>
            <button>내 리스트</button>
          </li>
          <li>
            <button>내정보</button>
          </li>
          <li>
            <button>버스킹하기</button>
          </li>
        </ul>
      </aside>
      <section></section>
    </main>
  );
}

export default App;
