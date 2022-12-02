import React from 'react';

const SearchBar = ({ children }) => {
  return (
    <form className='relative flex justify-center items-center mb-6'>
      <select
        ref={selectRef}
        className=' border-black border-2 rounded-xl p-2 font-sans text-lg mr-4'
        onChange={() => {
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
        ref={searchRef}
        onChange={() => {
          setPageNum(1);
          search(1);
        }}
      />
      {children}
    </form>
  );
};

export default SearchBar;
