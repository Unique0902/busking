import React from 'react';
import Login_nav from '../../components/login_header/login_nav';
import App_description from '../../components/app_description/app_description';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ authService, userRepository }) => {
  let navigate = useNavigate();
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        userRepository.checkUser(user.uid, (userData) => {
          if (userData) {
            navigate('/busking/app/home');
          } else {
            navigate('/busking/makeUser');
          }
        });
      } else {
      }
    });
  });
  return (
    <section className='bg-sky-500'>
      <section className='p-5 bg-slate-500 h-500'>
        <Login_nav />
        <main className='loginMain'>
          <h1 className='mainTitle'>
            노래책에 어서오세요. 당신만의 온라인, 오프라인 버스킹을 지금
            시작하세요.
          </h1>
          <h2 className='mainDescription'>
            당신만의 노래 리스트를 생성하여 신청곡을 받으세요.
          </h2>
          <ul className='loginBtns'>
            <li>
              <button
                onClick={() => {
                  authService.login('Google');
                }}
                className='loginBtn'
              >
                구글로 로그인
              </button>
            </li>
            {/* <li>
              <button className={styles.loginBtn}>네이버로 로그인</button>
            </li> */}
          </ul>
        </main>
      </section>
      {/* <App_description /> */}
    </section>
  );
};

export default Login;
