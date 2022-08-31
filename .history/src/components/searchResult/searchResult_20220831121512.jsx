import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ index, result, onSongClick, btnText }) => {
  const nameRef = useRef();
  const artistRef = useRef();
  return (
    <li className={styles.result}>
      <p  className={styles.index}>{index}</p>
      <p ref={nameRef} className={styles.name}>{result.name}</p>
      <p ref={artistRef} className={styles.artist}>{result.artist}</p>
      <button onClick={() => console.log(nameRef.current.value);} className={styles.btn}>
        {btnText}
      </button>
    </li>
  );
};

export default SearchResult;
