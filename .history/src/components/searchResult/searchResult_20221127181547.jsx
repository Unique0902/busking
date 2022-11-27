import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SearchResult = ({ index, result, onSongClick, btnText }) => {
  const nameRef = useRef();
  const artistRef = useRef();
  const [sid, getSid] = useState('');
  const [isHovering, setIsHovering] = useState(0);
  useEffect(() => {
    result.sid ? getSid(result.sid) : getSid(result.id);
  }, [result]);
  return (
    <li className='flex flex-row w-full text-white font-sans font-light bg-black rounded-xl mb-4 text-base justify-between px-2 py-2 text-center'>
      <p className='basis-1/12'>{index}</p>
      <div
        ref={nameRef}
        className='basis-7/12 relative'
        onMouseOver={() => setIsHovering(1)}
        onMouseOut={() => setIsHovering(0)}
      >
        {result.name.length > 20
          ? result.name.substr(0, 20) + '..'
          : result.name}
        {isHovering && (
          <p className='absolute bg-white text-black'>{result.name}</p>
        )}
      </div>
      <p ref={artistRef} className='basis-1/4'>
        {result.artist.length > 10
          ? result.artist.substr(0, 10) + '..'
          : result.artist}
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
