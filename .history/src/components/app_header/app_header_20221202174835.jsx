import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AdditionalMenu from '../additionalMenu/additionalMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import PlaylistMenu from '../playlistMenu/playlistMenu';
import LoginMenu from '../loginMenu/loginMenu';
import { useMediaQuery } from 'react-responsive';

const App_header = ({
  logout,
  userData,
  playlists,
  nowPlaylist,
  addBasicPlaylist,
  setNowPlaylist,
  removeNowPlaylist,
  addPlaylist,
  updateNowPlaylistName,
  setNowPlaylistId,
  isShowSideBar,
  setIsShowSideBar,
}) => {
  const valueRef = useRef();
  const [isShowAdditionalMenu, setIsShowAdditionalMenu] = useState(false);
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState(false);
  const [isShowLoginMenu, setIsShowLoginMenu] = useState(false);
  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
    }
  };
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });

  return (
    <>
      <header className='flex justify-between mb-10 '>
        <div>
          {isLgMediaQuery && (
            <button
              onClick={() => {
                setIsShowSideBar(!isShowSideBar);
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                className='font-sans text-white text-2xl mr-6'
              />
            </button>
          )}
          {isShowPlaylistMenu && (
            <PlaylistMenu
              setIsShowPlaylistMenu={setIsShowPlaylistMenu}
              playlists={playlists}
              changeNowPlaylist={changeNowPlaylist}
              nowPlaylist={nowPlaylist}
              addBasicPlaylist={addBasicPlaylist}
              removeNowPlaylist={removeNowPlaylist}
              addPlaylist={addPlaylist}
              updateNowPlaylistName={updateNowPlaylistName}
              setNowPlaylistId={setNowPlaylistId}
            />
          )}
          <button
            ref={valueRef}
            className='text-white font-sans text-xl hover:scale-110'
            onClick={() => {
              setIsShowPlaylistMenu(true);
            }}
          >
            {nowPlaylist ? nowPlaylist.name : 'No Playlist..'}
            <FontAwesomeIcon icon={faCaretDown} className='ml-2' />
          </button>
        </div>
        <button
          className='font-sans text-white text-xl hover:scale-110'
          onClick={() => {
            setIsShowLoginMenu(true);
          }}
        >
          {userData && userData.name}
        </button>
        {isShowLoginMenu && (
          <LoginMenu
            userData={userData}
            logout={logout}
            setIsShowLoginMenu={setIsShowLoginMenu}
          />
        )}
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
