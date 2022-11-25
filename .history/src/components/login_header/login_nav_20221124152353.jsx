import React from 'react';

const Login_nav = (props) => {
  return (
    <nav className=''>
      <div className='flex items-center'>
        <img
          src={require('../../img/bookLogo.png')}
          alt=''
          className=' h-10 w-10 mr-3'
        />
        <p className='font-sans text-3xl font-semibold text-black '>노래책</p>
      </div>
      <ul className=''>
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
    </nav>
  );
};

export default Login_nav;
