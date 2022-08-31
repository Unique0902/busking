import React from 'react';
import styles from './app_header.module.css';

const App_header = ({ logout, userName, playlists, addBasicPlaylist }) => {
  return (
    <>
      <header className={styles.header}>
        {playlists ? (
          <select className={styles.playlists}>
            {Object.values(playlists).map((playlist) => {
              return <option key={playlist.id}>{playlist.name}</option>;
            })}
          </select>
        ) : (
          <div>
            <p>No Playlist..</p>
            <button
              onClick={() => {
                addBasicPlaylist();
              }}
            >
              추가
            </button>
          </div>
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
