import React from 'react';
import styles from './makeUser.module.css';

const MakeUser = (props) => {
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Busking에서 사용할 닉네임을 적어주세요.</h2>
      <div className={styles.form}>
        <input type='text' className={styles.input} />
        <button>선택</button>
      </div>
    </section>
  );
};

export default MakeUser;
