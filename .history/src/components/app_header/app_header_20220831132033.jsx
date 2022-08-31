import React, { useRef } from 'react';
import { useEffect } from 'react';
import styles from './app_header.module.css';

const App_header = ({
  logout,
  userName,
  playlists,
  nowPlaylist,
  addBasicPlaylist,
  setNowPlaylist,
}) => {
  const valueRef = useRef();
  const changeNowPlaylist = (e) => {
    console.log(e.curentTarget);
  };

  return (
    <>
      <header className={styles.header}>
        {playlists ? (
          <select
            ref={valueRef}
            className={styles.playlists}
            onClick={(e) => {
              changeNowPlaylist(e);
            }}
          >
            {Object.values(playlists).map((playlist) => {
              return (
                <option data-id={playlist.id} key={playlist.id}>
                  {playlist.name}
                </option>
              );
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
