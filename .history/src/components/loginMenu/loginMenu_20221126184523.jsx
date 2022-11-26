import React from 'react';
import { useRef, useEffect } from 'react';

const LoginMenu = ({ userData, logout, setIsShowLoginMenu }) => {
  const wrapperRef = useRef();
  const btnStyle =
    'font-sans text-black text-lg text-center py-1 px-4 hover:bg-gray-200';
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowLoginMenu(false);
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
      className=' w-80  bg-white text-black absolute rounded-xl right-5'
    >
      <section className=' border-b border-gray-400 border-solid flex flex-col pt-2 pb-2'>
        <button className=' text-center text-blue-600 font-sans text-xl py-1 hover:bg-gray-200 px-4'>
          {userData && userData.name}
        </button>
        <button className={btnStyle}>회원정보</button>
        <button
          className={btnStyle}
          onClick={() => {
            logout();
          }}
        >
          로그아웃
        </button>
      </section>
      <section className='flex flex-row justify-around py-3 px-4'>
        <button className='text-gray-500 font-sans text-sm'>
          개인정보 처리 방침
        </button>
        <button className='text-gray-500 font-sans text-sm'>서비스 약관</button>
      </section>
    </div>
  );
};

export default LoginMenu;
