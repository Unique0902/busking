import React from 'react';

const Login_nav = (props) => {
  return (
    <nav className='flex items-center'>
      <div className='flex items-center'>
        <img
          src={require('../../img/bookLogo.png')}
          alt=''
          className=' h-12 w-12 mr-3'
        />
        <p className='font-sans text-3xl font-semibold text-black '>노래책</p>
      </div>
      <ul className='font-sans text-xl text-black font-semibold flex'>
        <li>
          <button className=' ml-5'>소개</button>
        </li>
        <li>
          <button className='ml-5'>찾기</button>
        </li>
        <li>
          <button className='ml-5'>지원</button>
        </li>
        <li>
          <button className='ml-5'>다운로드</button>
        </li>
      </ul>
    </nav>
  );
};

export default Login_nav;