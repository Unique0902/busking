import React from 'react';
import styles from './app_busking.module.css';

const App_busking = (props) => {
  return (
    <>
      <h1>버스킹하기</h1>
      <section>
        <div className={styles.option}>
          <h4 className={styles.title}>플레이리스트 선택</h4>
          <select name='playlists' className={styles.select}>
            <option value='플레이리스트1'>플레이리스트1</option>
          </select>
        </div>
        <div className={styles.option}>
          <h4 className={styles.title}>최대 곡수 제한</h4>
          <input type='number' name='' id='' className={styles.num} />
        </div>
        <div className={styles.option}>
          <h4 className={styles.title}>방 제목 설정</h4>
          <input type='text' name='' id='' className={styles.text} />
        </div>
      </section>
      <button>버스킹 방 생성</button>
    </>
  );
};

export default App_busking;