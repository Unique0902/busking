import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AdditionalMenu from '../additionalMenu/additionalMenu';
import styles from './app_header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import PlaylistMenu from '../playlistMenu/playlistMenu';

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
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState(false);
  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
    }
  };

  return (
    <>
      <header className='flex justify-between mb-5'>
        {isShowPlaylistMenu && (
          <PlaylistMenu
            setIsShowPlaylistMenu={setIsShowPlaylistMenu}
            playlists={playlists}
            changeNowPlaylist={changeNowPlaylist}
          />
        )}
        <button
          ref={valueRef}
          className='text-white font-sans text-xl'
          onClick={() => {
            setIsShowPlaylistMenu(true);
          }}
        >
          {nowPlaylist ? nowPlaylist.name : 'No Playlist'}
          <FontAwesomeIcon icon={faCaretDown} className='ml-2' />
        </button>
        <button className='font-sans text-white text-xl'>
          {userData && userData.name}
        </button>
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