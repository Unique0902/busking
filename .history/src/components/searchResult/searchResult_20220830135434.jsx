import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ key, result }) => {
  return (
    <>
      <p>{}</p>
      <p>{result.name}</p>
      <p>{result.artist}</p>
    </>
  );
};

export default SearchResult;
