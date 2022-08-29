import React from 'react';
import styles from './login.module.css';
import Login_nav from '../components/login_header/login_nav';
import App_description from '../components/app_description/app_description';

const Login = (props) => {
  return (
    <section className={styles.login}>
      <section className={styles.background}>
        <Login_nav />
        <main className={styles.loginMain}>
          <h1 className={styles.mainTitle}>
            얼굴책에 어서오세요. 당신만의 온라인, 오프라인 버스킹을 지금
            시작하세요.
          </h1>
          <h2 className={styles.mainDescription}>
            당신만의 노래 리스트를 생성하여 신청곡을 받으세요.
          </h2>
          <ul className={styles.loginBtns}>
            <li>
              <button className={styles.loginBtn}>구글로 로그인</button>
            </li>
            <li>
              <button className={styles.loginBtn}>네이버로 로그인</button>
            </li>
          </ul>
        </main>
      </section>
      <App_description />
    </section>
  );
};

export default Login;
