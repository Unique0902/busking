import React from 'react';
import { useRef } from 'react';
import styles from './makeUser.module.css';

const MakeUser = ({ authService, userRepository }) => {
  const nameRef = useRef();
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Busking에서 사용할 닉네임을 정해주세요.</h2>
      <div className={styles.form}>
        <input ref={nameRef} type='text' className={styles.input} />
        <button
          className={styles.btn}
          onClick={() => {
            console.log(authService);
            const name = nameRef.current.value;
            const userId = authService.user.uid;
            userRepository.makeUser(userId, name);
          }}
        >
          선택
        </button>
      </div>
    </section>
  );
};

export default MakeUser;
