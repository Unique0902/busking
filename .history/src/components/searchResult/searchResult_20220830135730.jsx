import React from 'react';
import styles from './searchResult.module.css';

const SearchResult = ({ index, result }) => {
  return (
    <li className={styles.result}>
      <p>{index}</p>
      <p>{result.name}</p>
      <p>{result.artist}</p>
    </li>
  );
};

export default SearchResult;
