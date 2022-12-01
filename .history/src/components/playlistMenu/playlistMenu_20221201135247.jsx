import React from 'react';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

const PlaylistMenu = ({
  setIsShowPlaylistMenu,
  playlists,
  changeNowPlaylist,
  nowPlaylist,
  addBasicPlaylist,
  removeNowPlaylist,
  addPlaylist,
}) => {
  const wrapperRef = useRef();
  const inputRef = useRef();
  const [isShowInput, setIsShowInput] = useState(false);
  const [isCanApply, setIsCanApply] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const btnStyle =
    'font-sans text-black text-lg text-left py-1 px-4 hover:bg-gray-200';
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowPlaylistMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  useEffect(() => {
    if (isShowInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowInput, inputRef.current]);
  useEffect(() => {
    if (playlistName && playlistName.length <= 20) {
      setIsCanApply(true);
    } else {
      setIsCanApply(false);
    }
  }, [playlistName]);
  return (
    <div
      ref={wrapperRef}
      className=' w-80 border-gray-600 border bg-white text-black absolute rounded-xl z-50'
    >
      <section className=' border-b border-gray-600 border-solid flex flex-col pt-2 pb-2'>
        {nowPlaylist ? (
          <button className=' text-left text-blue-600 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
            {nowPlaylist && nowPlaylist.name}
          </button>
        ) : (
          <button className=' text-left text-gray-400 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
            플레이리스트가 없음
          </button>
        )}

        {!isShowInput && (
          <button
            className={btnStyle}
            onClick={() => {
              setIsShowInput(true);
              // addBasicPlaylist();
              // setIsShowPlaylistMenu(false);
            }}
          >
            플레이리스트 추가
          </button>
        )}
        {isShowInput && (
          <>
            <input
              type='text'
              placeholder='Playlist Name'
              className='px-4 py-3 border-0 font-sans text-lg font-normal rounded-lg'
              value={playlistName}
              ref={inputRef}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
            <div className='flex flex-row'>
              <button
                className={`w-1/2 py-2 ${
                  isCanApply ? 'text-black' : 'text-gray-300'
                } hover:bg-gray-200 font-sans text-lg font-medium`}
                onClick={() => {
                  if (isCanApply) {
                    addPlaylist(playlistName);
                  }
                }}
              >
                추가
              </button>
              <button
                className='w-1/2 py-2 hover:bg-gray-200 font-sans text-lg font-medium'
                onClick={() => {
                  setIsShowInput(false);
                }}
              >
                취소
              </button>
            </div>
          </>
        )}

        {playlists && (
          <button
            className={btnStyle}
            onClick={() => {
              removeNowPlaylist();
              setIsShowPlaylistMenu(false);
            }}
          >
            현재 플레이리스트 제거
          </button>
        )}
      </section>
      <section className='flex flex-col py-2'>
        <p className='text-gray-500 font-sans text-base px-4 py-2'>
          모든 플레이리스트
        </p>
        {playlists &&
          Object.values(playlists).map((playlist) => {
            return (
              <button
                className={btnStyle}
                data-id={playlist.id}
                key={playlist.id}
                onClick={(e) => {
                  changeNowPlaylist(e.currentTarget.dataset.id);
                  setIsShowPlaylistMenu(false);
                }}
              >
                {playlist.name && playlist.name}
              </button>
            );
          })}
      </section>
    </div>
  );
};

export default PlaylistMenu;
