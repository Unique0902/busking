import React, { useRef } from 'react';
import { useEffect } from 'react';
import styles from './app_header.module.css';

const App_header = ({
  logout,
  userData,
  playlists,
  nowPlaylist,
  addBasicPlaylist,
  setNowPlaylist,
}) => {
  const valueRef = useRef();
  const changeNowPlaylist = () => {
    setNowPlaylist(
      Object.values(playlists).find(
        (list) => list.name === valueRef.current.value
      )
    );
  };

  return (
    <>
      <header className={styles.header}>
        {playlists ? (
          <select
            ref={valueRef}
            className={styles.playlists}
            onChange={() => {
              changeNowPlaylist();
            }}
          >
            {Object.values(playlists).map((playlist) => {
              return (
                <option data-id={playlist.id} key={playlist.id}>
                  {playlist.name && playlist.name}
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
              기본 리스트추가
            </button>
          </div>
        )}
        <div className={styles.users}>{userData.name}</div>
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