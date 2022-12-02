import React, { useState, useEffect } from 'react';

const SongSearchBar = ({ onChangeInput, children }) => {
  const [searchWord, setSearchWord] = useState('');
  const [searchCategory, setSearchCategory] = useState('제목');
  useEffect(() => {
    if (searchWord) {
      onChangeInput(searchWord);
    }
  }, [searchWord]);
  return (
    <form className='relative flex justify-center items-center mb-6'>
      <select
        className=' border-black border-2 rounded-xl p-2 font-sans text-lg mr-4'
        value={searchCategory}
        onChange={(e) => {
          setSearchCategory(e.target.value);
          setPageNum(1);
          search(1);
        }}
      >
        <option value='제목'>제목</option>
        <option value='가수'>가수</option>
      </select>
      <input
        type='search'
        className='border-black border-2 p-2 rounded-xl w-2/5 font-sans text-lg'
        placeholder='검색어를 입력하세요..'
        value={searchWord}
        onChange={() => {
          setSearchWord(e.target.value);
          setPageNum(1);
          search(1);
        }}
      />
      {children}
    </form>
  );
};

export default SongSearchBar;