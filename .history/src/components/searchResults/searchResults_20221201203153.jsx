import React from 'react';
import SearchResult from '../searchResult/searchResult';

const SearchResults = ({
  isSearch,
  results,
  pageNum,
  btnText,
  onSongClick,
}) => {
  if (isSearch) {
    return (
      <>
        {searchResults &&
          searchResults.map((result) => (
            <SearchResult
              key={searchResults.indexOf(result)}
              index={searchResults.indexOf(result) + 1 + (pageNum - 1) * 6}
              result={result}
              btnText='추가'
              onSongClick={addSongToPlaylist}
            />
          ))}
      </>
    );
  } else {
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
  }
};

export default SearchResults;
