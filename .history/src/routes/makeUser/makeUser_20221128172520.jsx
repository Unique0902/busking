import React, { useRef, useState, useEffect } from 'react';
import styles from './makeUser.module.css';
import { useNavigate } from 'react-router-dom';

const MakeUser = ({ authService, userRepository }) => {
  const nameRef = useRef();
  let navigate = useNavigate();
  const [isCanApply, setIsCanApply] = useState(false);
  useEffect(() => {}, []);
  return (
    <section className=' h-screen flex flex-col p-16 items-center'>
      <h2 className=' font-sans text-3xl font-semibold'>
        노래책에서 사용할 닉네임을 정해주세요.
      </h2>
      <div className='mt-40'>
        <input
          ref={nameRef}
          type='text'
          className='px-5 py-3 border border-black rounded-2xl font-sans text-3xl text-black'
        />
      </div>
      <button
        className={styles.btn}
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
        선택
      </button>
    </section>
  );
};

export default MakeUser;
