import React from 'react';

const Login_nav = (props) => {
  return (
    <nav className='flex items-center justify-around'>
      <div className='flex items-center'>
        <img
          src={require('../../img/bookLogo.png')}
          alt=''
          className=' h-12 w-12 mr-3'
        />
        <p className='font-sans text-3xl font-semibold text-black '>노래책</p>
      </div>
      <ul className='w-2/5 justify-around font-sans text-xl text-black font-semibold flex'>
        <li>
          <button className=''>소개</button>
        </li>
        <li>
          <button className=''>찾기</button>
        </li>
        <li>
          <button className=''>지원</button>
        </li>
        <li>
          <button className=''>다운로드</button>
        </li>
      </ul>
      <button className='text-white p-4 font-sans text-xl bg-slate-900 rounded-3xl'>
        튜토리얼
      </button>
    </nav>
  );
};

export default Login_nav;
