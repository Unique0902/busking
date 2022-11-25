import React from 'react';

const Login_nav = (props) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={require('../../img/bookLogo.png')}
          alt=''
          className=' h-5 w-5'
        />
        <p>노래책</p>
      </div>
      <ul className={styles.menu}>
        <li>
          <button className={styles.button}>소개</button>
        </li>
        <li>
          <button className={styles.button}>찾기</button>
        </li>
        <li>
          <button className={styles.button}>지원</button>
        </li>
        <li>
          <button className={styles.button}>다운로드</button>
        </li>
      </ul>
    </nav>
  );
};

export default Login_nav;
