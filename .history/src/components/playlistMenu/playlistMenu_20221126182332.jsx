import React from 'react';
import { useRef, useEffect } from 'react';

const PlaylistMenu = ({
  setIsShowPlaylistMenu,
  playlists,
  changeNowPlaylist,
  nowPlaylist,
}) => {
  const wrapperRef = useRef();
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
  return (
    <div
      ref={wrapperRef}
      className=' w-80  bg-white text-black absolute rounded-xl'
    >
      <section className=' border-b border-gray-600 border-solid flex flex-col pt-2 pb-2'>
        {nowPlaylist ? (
          <button className=' text-left text-blue-600 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
            {nowPlaylist && nowPlaylist.name}
          </button>
        ) : (
          <button className=' text-left text-red-600 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
            플레이리스트가 없음
          </button>
        )}

        <button className={btnStyle}>플레이리스트 추가</button>
        <button className={btnStyle}>플레이리스트 제거</button>
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
