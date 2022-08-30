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
      <header>
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
      <section>
        <ul>
          {searchResults &&
            searchResults.map((result) => (
              <SearchResult
                key={searchResults.indexOf(result)}
                result={result}
              />
            ))}
          <li>
            <p className={styles.index}>1</p>
            <p className={styles.singer}>블랙핑크</p>
            <p className={styles.title}>마지막처럼</p>
            <p className={styles.album}>like final</p>
            <button
              onClick={() => {
                lastfm
                  .searchSongByName('venom')
                  .then((result) =>
                    console.log(result.trackmatches.track[0].name)
                  );
              }}
              className={styles.addBtn}
            >
              추가
            </button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default App_add;
