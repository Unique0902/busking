import React from 'react';
import { useRef, useEffect } from 'react';

const AdditionalMenu = ({ setIsShowAdditionalMenu }) => {
  const wrapperRef = useRef();
  const btnStyle = 'font-sans text-black text-lg text-left py-1 px-4';
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
      className=' w-96  bg-white text-black absolute rounded-xl'
    >
      <section className=' border-b border-gray-600 border-solid flex flex-col'>
        <button className=' text-left text-blue-600 font-sans text-xl py-1 mt-2 hover:bg-gray-200 px-4'>
          Playlist1
        </button>
        <button className={btnStyle}>플레이리스트 추가</button>
        <button className={btnStyle}>플레이리스트 제거</button>
      </section>
      <section>
        <p>모든 플레이리스트</p>
        <button>Playlist1</button>
        <button>Playlist2</button>
        <button>Playlist3</button>
      </section>
    </div>
  );
};

export default AdditionalMenu;
