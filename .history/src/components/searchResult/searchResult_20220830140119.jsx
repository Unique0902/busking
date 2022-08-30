import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ index, result, onSongClick, btnText }) => {
  return (
    <li className={styles.result}>
      <p>{index}</p>
      <p>{result.name}</p>
      <p>{result.artist}</p>
      <button onClick={() => onSongClick()} className={styles.btn}>
        {btnText}
      </button>
    </li>
  );
};

export default SearchResult;
