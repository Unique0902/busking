import React from 'react';

const SearchBar = (props) => {
  return (
    <section className='relative flex justify-center items-center mb-6'>
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
      <InfoBtn
        text={'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'}
      />
    </section>
  );
};

export default SearchBar;
