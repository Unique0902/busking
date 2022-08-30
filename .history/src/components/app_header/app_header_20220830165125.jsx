import React from 'react';
import styles from './app_header.module.css';

const App_header = ({ logout }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.playlists}>playlist1</div>
        <div className={styles.users}>묵</div>
        <button
          onClick={() => {
            logout();
          }}
          className={styles.logout}
        >
          로그아웃
        </button>
      </header>
    </>
  );
};

export default App_header;
