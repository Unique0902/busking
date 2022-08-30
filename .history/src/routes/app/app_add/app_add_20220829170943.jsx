import React from 'react';
import styles from './app_add.module.css';

const App_add = (props) => {
  return (
    <>
      <header>
        <select>
          <option value='제목'>제목</option>
          <option value='가수'>가수</option>
          <option value='앨범'>앨범</option>
        </select>
        <input type='search' placeholder='search..' />
        <button type='submit'>
          <img src='/images/search.png' alt='search' />
        </button>
      </header>
      <section>
        <ul>
          <li>
            <p className={styles.index}>1</p>
            <p className={styles.singer}>블랙핑크</p>
            <p className={styles.title}>마지막처럼</p>
            <p className={styles.album}>like final</p>
            <button className={styles.addBtn}>추가</button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default App_add;
