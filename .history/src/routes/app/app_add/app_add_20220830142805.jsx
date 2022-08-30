import React, { useRef } from 'react';
import { useState } from 'react';
import styles from './app_add.module.css';
import SearchResult from '../../../components/searchResult/searchResult';

const App_add = ({ lastfm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef();
  const selectRef = useRef();
  const search = () => {
    if (searchRef.current.value) {
      if (selectRef.current.value === '제목') {
        lastfm
          .searchSongByName(searchRef.current.value)
          .then((result) => setSearchResults(result.trackmatches.track));
      } else if (selectRef.current.value === '가수') {
        lastfm
          .searchSongByArtist(searchRef.current.value)
          .then((result) => setSearchResults(result.trackmatches.track));
      }
    }
  };
  return (
    <>
      <header className={styles.searchBar}>
        <select ref={selectRef}>
          <option value='제목'>제목</option>
          <option value='가수'>가수</option>
        </select>
        <input
          type='search'
          placeholder='search..'
          ref={searchRef}
          onChange={() => {
            search();
          }}
        />
        <button type='submit'>
          <img src='/images/search.png' alt='search' />
        </button>
      </header>
      <section className={styles.results}>
        <ul>
          <li className={styles.description}>
            <div className={styles.index}>index</div>
            <div className={styles.name}>이름</div>
            <div className={styles.artist}>아티스트</div>
            <div className={styles.btn}>플레이리스트에 추가</div>
          </li>
          {searchResults &&
            searchResults.map((result) => (
              <SearchResult
                key={searchResults.indexOf(result)}
                index={searchResults.indexOf(result) + 1}
                result={result}
                btnText='추가'
              />
            ))}
        </ul>
      </section>
    </>
  );
};

export default App_add;
