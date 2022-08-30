import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ index, result }) => {
  return (
    <>
      <p>{index}</p>
      <p>{result.name}</p>
      <p>{result.artist}</p>
    </>
  );
};

export default SearchResult;
