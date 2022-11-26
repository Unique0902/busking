import React from 'react';
import { useRef, useEffect } from 'react';

const AdditionalMenu = ({ setIsShowAdditionalMenu }) => {
  const wrapperRef = useRef();
  const btnStyle = 'font-sans text-black text-lg text-left';
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
      <section className=' border-b border-gray-600 border-solid p-3 flex flex-col'>
        <button className=' text-left text-blue-600 font-sans text-xl py-2'>
          Playlist1
        </button>
        <button className=' text-left text-black font-sans text-lg'>
          플레이리스트 추가
        </button>
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
