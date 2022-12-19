import React, { useRef } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import PlaylistMenu from './PlaylistMenu';
import LoginMenu from './LoginMenu';
import { useMediaQuery } from 'react-responsive';
import { useUserDataContext } from '../context/UserDataContext';
import { useLocation } from 'react-router-dom';
import { usePlaylistContext } from '../context/PlaylistContext';

export default function AppHeader({ isShowSideBar, setIsShowSideBar }) {
  const { userData } = useUserDataContext();
  const {
    playlists,
    nowPlaylist,
    addBasicPlaylist,
    setNowPlaylist,
    removeNowPlaylist,
    addPlaylist,
    updateNowPlaylistName,
    setNowPlaylistId,
  } = usePlaylistContext();
  const valueRef = useRef();
  const [isShowPlaylistMenu, setIsShowPlaylistMenu] = useState(false);
  const [isShowLoginMenu, setIsShowLoginMenu] = useState(false);
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  let location = useLocation();
  if (location.pathname === '/busking/app/busking' && !isLgMediaQuery) {
    return <></>;
  }
  const changeNowPlaylist = (id) => {
    if (playlists[id]) {
      setNowPlaylist(playlists[id]);
    }
  };

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
            setIsShowLoginMenu={setIsShowLoginMenu}
          />
        )}
      </header>
    </>
  );
}
