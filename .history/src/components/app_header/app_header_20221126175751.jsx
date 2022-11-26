import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AdditionalMenu from '../additionalMenu/additionalMenu';
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
  const [isShowAdditionalMenu, setIsShowAdditionalMenu] = useState(false);
  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
    }
  };

  return (
    <>
      <header className='flex justify-between mb-5'>
        {isShowAdditionalMenu && (
          <AdditionalMenu
            setIsShowAdditionalMenu={setIsShowAdditionalMenu}
            playlists={playlists}
            changeNowPlaylist={changeNowPlaylist}
          />
        )}
        {playlists ? (
          <button
            ref={valueRef}
            className='text-white font-sans text-xl'
            onClick={() => {
              setIsShowAdditionalMenu(true);
            }}
            // onChange={() => {
            //   changeNowPlaylist();
            // }}
          >
            {/* {Object.values(playlists).map((playlist) => {
              return (
                <option data-id={playlist.id} key={playlist.id}>
                  {playlist.name && playlist.name}
                </option>
              );
            })} */}
            {nowPlaylist && nowPlaylist.name}
          </button>
        ) : (
          <div>
            <p>No Playlist..</p>
            <button
              onClick={() => {
                addBasicPlaylist();
              }}
            >
              플레이리스트 추가
            </button>
          </div>
        )}
        <div className={styles.users}>{userData && userData.name}</div>
        {/* <button
          onClick={() => {
            logout();
          }}
          className={styles.logout}
        >
          로그아웃
        </button> */}
      </header>
    </>
  );
};

export default App_header;
