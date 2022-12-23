import React from 'react';
import PageNumScreen from './PageNumScreen';
import SearchResults from './SearchResults';

export default function SongTable({
  isSearch,
  results,
  pageNum,
  btnText,
  onSongClick,
  resultNum,
  onPagePlus,
  onPageMinus,
}) {
  return (
    <section className='w-full'>
      <ul className='bg-gray-800 rounded-xl p-1'>
        <SearchResults
          isSearch={isSearch}
          results={results}
          pageNum={pageNum}
          btnText={btnText}
          onSongClick={onSongClick}
        />
        <PageNumScreen
          resultNum={resultNum}
          pageNum={pageNum}
          onPagePlus={onPagePlus}
          onPageMinus={onPageMinus}
        />
      </ul>
    </section>
  );
}
