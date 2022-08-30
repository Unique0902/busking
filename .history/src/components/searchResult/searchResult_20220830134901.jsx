import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ result }) => {
  return (
    <>
      <p>{result.name}</p>
      <p>{result.artist}</p>
    </>
  );
};

export default SearchResult;
