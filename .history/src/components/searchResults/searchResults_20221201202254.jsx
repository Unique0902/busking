import React from 'react';
import SearchResult from '../searchResult/searchResult';

const SearchResults = ({ results, pageNum, btnText, onSongClick }) => {
  return (
    <>
      {results &&
        results
          .slice((pageNum - 1) * 6, pageNum * 6)
          .map((result) => (
            <SearchResult
              key={results.indexOf(result)}
              index={results.indexOf(result) + 1}
              result={result}
              btnText={btnText}
              onSongClick={onSongClick}
            />
          ))}
    </>
  );
};

export default SearchResults;
