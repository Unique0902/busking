import React from 'react';
import { useRef } from 'react';
import styles from './makeUser.module.css';
import { useNavigate } from 'react-router-dom';

const MakeUser = ({ authService, userRepository }) => {
  const nameRef = useRef();
  let navigate = useNavigate();

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>노래책에서 사용할 닉네임을 정해주세요.</h2>
      <div className={styles.form}>
        <input ref={nameRef} type='text' className={styles.input} />
        <button
          className={styles.btn}
          onClick={() => {
            const name = nameRef.current.value;
            const userId = authService.auth.currentUser.uid;
            userRepository.makeUser(userId, name, () => {
              navigate('/busking/app/home');
            });
          }}
        >
          선택
        </button>
      </div>
    </section>
  );
};

export default MakeUser;
