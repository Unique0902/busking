import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ key, result }) => {
  return (
    <>
      <p>{key + 1}</p>
      <p>{result.name}</p>
      <p>{result.artist}</p>
    </>
  );
};

export default SearchResult;
