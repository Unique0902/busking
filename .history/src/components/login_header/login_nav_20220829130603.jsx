import React from 'react';

const Login_nav = (props) => {
  return (
    <nav>
      <div className='logo'>
        <img src='' alt='' className='logo_img' />
        <p>노래책</p>
      </div>
      <ul className='menu'>
        <li>
          <button>소개</button>
        </li>
        <li>
          <button>찾기</button>
        </li>
        <li>
          <button>지원</button>
        </li>
        <li>
          <button>다운로드</button>
        </li>
      </ul>
    </nav>
  );
};

export default Login_nav;
