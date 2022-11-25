import React from 'react';

const Login_nav = (props) => {
  return (
    <nav className=''>
      <div className=''>
        <img
          src={require('../../img/bookLogo.png')}
          alt=''
          className=' h-10 w-10'
        />
        <p>노래책</p>
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
