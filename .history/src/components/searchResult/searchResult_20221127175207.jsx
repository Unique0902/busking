import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SearchResult = ({ index, result, onSongClick, btnText }) => {
  const nameRef = useRef();
  const artistRef = useRef();
  const [sid, getSid] = useState('');
  useEffect(() => {
    result.sid ? getSid(result.sid) : getSid(result.id);
  }, [result]);
  return (
    <li className='flex flex-row text-white font-sans font-light bg-black rounded-xl mb-4 text-lg justify-between px-2 py-2 text-center'>
      <p className='basis-1/12'>{index}</p>
      <p ref={nameRef} className='basis-7/12'>
        {result.name || result.title}
      </p>
      <p ref={artistRef} className='basis-1/4'>
        {result.artist}
      </p>
      {result.cnt && <p className='basis-1/12'>{result.cnt}</p>}
      <button
        onClick={() => {
          btnText === '추가'
            ? onSongClick(
                nameRef.current.innerText,
                artistRef.current.innerText
              )
            : onSongClick(sid);
        }}
        className='basis-1/12'
      >
        {btnText}
      </button>
    </li>
  );
};

export default SearchResult;
