import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';

function App() {
  return (
    <main className={styles.app}>
      <Sidebar />
      <section></section>
    </main>
  );
}

export default App;
