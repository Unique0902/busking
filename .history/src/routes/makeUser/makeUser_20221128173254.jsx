import React, { useRef, useState, useEffect } from 'react';
import styles from './makeUser.module.css';
import { useNavigate } from 'react-router-dom';

const MakeUser = ({ authService, userRepository }) => {
  const nameRef = useRef();
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [isCanApply, setIsCanApply] = useState(false);
  useEffect(() => {
    if (name.length > 1 && name.length < 9) {
      setIsCanApply(true);
    } else {
      setIsCanApply(false);
    }
  }, [name]);
  return (
    <section className=' h-screen flex flex-col p-16 items-center bg-gradient-to-b from-blue-500 to-blue-900'>
      <h2 className=' font-sans text-3xl font-semibold'>
        노래책에서 사용할 닉네임을 정해주세요.
      </h2>
      <div className='mt-40'>
        <input
          ref={nameRef}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className='px-5 py-4 border border-black rounded-2xl font-sans text-3xl text-black'
        />
      </div>
      <button
        className={`w-1/4 ${
          isCanApply
            ? 'bg-black hover:bg-gray-400'
            : 'bg-none border border-gray-300'
        } py-4 rounded-xl mt-16`}
        onClick={() => {
          if (isCanApply) {
            const name = nameRef.current.value;
            const userId = authService.auth.currentUser.uid;
            userRepository.makeUser(userId, name, () => {
              navigate('/busking/app/home');
            });
          }
        }}
      >
        노래책 시작하기
      </button>
    </section>
  );
};

export default MakeUser;