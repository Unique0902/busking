import React from 'react';
import styles from './app_home.module.css';

const App_home = (props) => {
  return (
    <>
      <section className={styles.home}>
        <div className={styles.title}>
          <h1 className={styles.titleText}>playlist1</h1>
          <button className={styles.addBtn}>playlist 추가</button>
        </div>
        <h2>지금까지 12명에게 노래를 받았어요!</h2>
        <h2>당신이 버스킹한 횟수는 5번 입니다!</h2>
        <h2>주요 버스킹 방법: 온라인</h2>
      </section>
      <section>
        <h1>playlist 1</h1>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p>......</p>
        <button>버스킹 하러 가기</button>
      </section>
    </>
  );
};

export default App_home;
