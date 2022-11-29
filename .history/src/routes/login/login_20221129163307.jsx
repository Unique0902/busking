import React from 'react';
import Login_nav from '../../components/login_header/login_nav';
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
      <section className='p-10 bg-white'>
        <Login_nav />
        <main className=' w-2/5 pt-24 pb-24 m-auto'>
          <h1 className='font-sans text-6xl font-semibold text-black text-center'>
            당신만의{' '}
            <div className='inline text-blue-600 font-extrabold'>
              온라인, 오프라인 버스킹
            </div>
            을 여기서 시작하세요.
          </h1>
          <h2 className='font-sans text-2xl font-normal mt-10 text-black text-center'>
            당신만의 노래 리스트를 생성하여 애창곡을 검색하여 저장하세요.
            버스킹을 시작하여 공유되는 링크를 이용하여 관객들로부터 노래를
            신청받으세요.
          </h2>
          <ul className='flex justify-center mt-10'>
            <li>
              <button
                onClick={() => {
                  authService.login('Google');
                }}
                className='text-white hover:scale-105 py-4 px-8 font-sans text-xl bg-slate-900 rounded-3xl'
              >
                Google로 로그인하기
              </button>
            </li>
            {/* <li>
              <button className={styles.loginBtn}>네이버로 로그인</button>
            </li> */}
          </ul>
        </main>
      </section>
      <section className='bg-blue-200 py-48 flex flex-row justify-center items-center rounded-xl'>
        <img
          src={require('../../img/screenMakePlaylist.png')}
          alt=''
          className='w-1/3 mr-3'
        />
        <div className='w-1/3 ml-32'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6'>
            당신만의 노래 리스트를 생성하세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal '>
            노래책은 노래리스트를 여러 개 만들 수 있어요. 각 리스트마다 주제를
            정해놓고 알맞은 곡을 저장해보세요.
          </p>
        </div>
      </section>
      <section className='bg-blue-400 py-48 flex flex-row justify-center items-center rounded-xl'>
        <div className='w-1/3 mr-32'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6'>
            당신의 애창곡을 검색하여 노래리스트에 추가하세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal '>
            노래책은 다양한 장르의 노래들의 검색을 지원해요. 부를 수 있는 다양한
            노래들을 검색해 보고 부르고 싶은 노래들을 노래리스트에 추가해보세요.
          </p>
        </div>
        <img
          src={require('../../img/screenAddSong.png')}
          alt=''
          className='w-1/3 mr-3'
        />
      </section>
      <section className='bg-blue-200 py-48 flex flex-row justify-center items-center rounded-xl'>
        <img
          src={require('../../img/screenMakeBusking.png')}
          alt=''
          className='w-1/3 mr-3'
        />
        <div className='w-1/3 ml-32'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6'>
            만든 노래리스트를 이용하여 버스킹을 시작하세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal '>
            노래들을 리스트에 추가한 후, 원하는 노래 리스트를 선택하여 버스킹을
            시작할 수 있어요. 최대 곡 수 제한, 방 제목 설정 등 버스킹에 대해
            다양한 설정을 할 수 있어요.
          </p>
        </div>
      </section>
      <section className='bg-blue-400 py-48 flex flex-row justify-center items-center rounded-xl'>
        <div className='w-1/3 mr-32'>
          <h2 className='text-black font-sans text-5xl font-semibold mb-6'>
            관객들로부터 노래리스트에 있는 노래들을 신청받으세요.
          </h2>
          <p className='text-black font-sans text-xl font-normal '>
            버스킹을 시작하면 위에 노래를 신청받을 수 있는 링크와 그 링크로 바로
            접속할 수 있는 QR코드가 있어요. 이를 이용하여 관객들로부터 노래를
            신청받으세요. 그러면 아래의 신청 곡 리스트에 신청된 노래들이
            나타나요
          </p>
        </div>
        <img
          src={require('../../img/screenBusking.png')}
          alt=''
          className='w-1/3 mr-3'
        />
      </section>
    </section>
  );
};

export default Login;
