import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ index, result, onSongClick, btnText }) => {
  return (
    <li className={styles.result}>
      <p className={styles.index}>{index}</p>
      <p className={styles.name}>{result.name}</p>
      <p className={styles.artist}>{result.artist}</p>
      <button onClick={() => onSongClick()} className={styles.btn}>
        {btnText}
      </button>
    </li>
  );
};

export default SearchResult;
