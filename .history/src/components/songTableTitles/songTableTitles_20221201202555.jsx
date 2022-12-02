import React from 'react';

const SongTableTitles = (props) => {
  return (
    <li className='flex flex-row justify-between text-center px-2 py-1'>
      <div className=' basis-1/12'>index</div>
      <div className='basis-7/12 '>이름</div>
      <div className='basis-1/4 '>아티스트</div>
      <div className='basis-1/12'></div>
    </li>
  );
};

export default SongTableTitles;
