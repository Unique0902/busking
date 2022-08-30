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
            <p>1</p>
            <p>블랙핑크</p>
            <p>마지막처럼</p>
            <p>like final</p>
            <button>추가</button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default App_add;
