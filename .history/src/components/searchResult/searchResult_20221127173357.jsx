import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ index, result, onSongClick, btnText }) => {
  const nameRef = useRef();
  const artistRef = useRef();
  const [sid, getSid] = useState('');
  useEffect(() => {
    result.sid ? getSid(result.sid) : getSid(result.id);
  }, [result]);
  return (
    <li className='flex flex-row text-white font-sans font-light bg-black rounded-xl mb-4 text-lg justify-between px-2 py-1 text-center'>
      <p className={styles.index}>{index}</p>
      <p ref={nameRef} className={styles.name}>
        {result.name || result.title}
      </p>
      <p ref={artistRef} className={styles.artist}>
        {result.artist}
      </p>
      {result.cnt && <p className={styles.cnt}>{result.cnt}</p>}
      <button
        onClick={() => {
          btnText === '추가'
            ? onSongClick(
                nameRef.current.innerText,
                artistRef.current.innerText
              )
            : onSongClick(sid);
        }}
        className={styles.btn}
      >
        {btnText}
      </button>
    </li>
  );
};

export default SearchResult;
