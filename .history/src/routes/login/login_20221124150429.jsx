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
    <section className='w-screen h-screen'>
      <section className='p-10 bg-gray-300'>
        <Login_nav />
        <main className='px-52 py-36'>
          <h1 className='font-sans text-5xl font-bold text-black text-center'>
            당신만의 온라인, 오프라인 버스킹을 여기서 시작하세요.
          </h1>
          <h2 className='font-sans text-xl font-normal mt-10 text-black text-center'>
            당신만의 노래 리스트를 생성하여 애창곡을 검색하여 저장하세요.
            버스킹을 시작하여 공유되는 링크를 이용하여 관객들로부터 노래를
            신청받으세요.
          </h2>
          <ul className='flex justify-center mt-5'>
            <li>
              <button
                onClick={() => {
                  authService.login('Google');
                }}
                className='text-white p-4 font-sans text-xl bg-slate-900 rounded-2xl'
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
