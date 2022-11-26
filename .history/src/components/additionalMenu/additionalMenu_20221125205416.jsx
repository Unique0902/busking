import React from 'react';
import { useRef, useEffect } from 'react';

const AdditionalMenu = ({ setIsShowAdditionalMenu, playlists }) => {
  const wrapperRef = useRef();
  const btnStyle =
    'font-sans text-black text-lg text-left py-1 px-4 hover:bg-gray-200';
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowAdditionalMenu(false);
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
        <button className=' text-left text-blue-600 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
          Playlist1
        </button>
        <button className={btnStyle}>플레이리스트 추가</button>
        <button className={btnStyle}>플레이리스트 제거</button>
      </section>
      <section className='flex flex-col py-2'>
        <p className='text-gray-500 font-sans text-base px-4 py-2'>
          모든 플레이리스트
        </p>
        {Object.values(playlists).map((playlist) => {
          return (
            <button
              className={btnStyle}
              data-id={playlist.id}
              key={playlist.id}
              onClick={(e) => {
                console.log(e.currentTarget.value);
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

export default AdditionalMenu;
