import React from 'react';
import styles from './app_header.module.css';

const App_header = ({ logout, userName, playlists }) => {
  return (
    <>
      <header className={styles.header}>
        {playlists ? (
          <select className={styles.playlists}></select>
        ) : (
          <p>플레이리스트가 없습니다!</p>
        )}
        <div className={styles.users}>{userName}</div>
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
