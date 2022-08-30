import React from 'react';
import styles from './app_add.module.css';

const App_add = (props) => {
  return (
    <>
      <input type='search' placeholder='search..' />
      <button type='submit'>
        <img src='../../images/search.png' alt='search' />
      </button>
    </>
  );
};

export default App_add;
