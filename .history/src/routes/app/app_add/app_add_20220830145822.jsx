import React, { useRef } from 'react';
import { useState } from 'react';
import styles from './app_add.module.css';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';

const App_add = ({ lastfm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const searchRef = useRef();
  const selectRef = useRef();
  const search = () => {
    if (searchRef.current.value) {
      if (selectRef.current.value === '제목') {
        lastfm
          .searchSongByName(searchRef.current.value, pageNum)
          .then((result) => {
            setSearchResults(result.trackmatches.track);
            setResultNum(parseInt(result['opensearch:totalResults']));
          });
      } else if (selectRef.current.value === '가수') {
        lastfm
          .searchSongByArtist(searchRef.current.value, pageNum)
          .then((result) => {
            setSearchResults(result.trackmatches.track);
            setResultNum(parseInt(result['opensearch:totalResults']));
          });
      }
    }
  };
  const plusPage = () => {
    setPageNum(pageNum + 1);
  };
  const minusPage = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
    }
  };
  return (
    <>
      <header className={styles.searchBar}>
        <select
          ref={selectRef}
          onChange={() => {
            setPageNum(1);
            search();
          }}
        >
          <option value='제목'>제목</option>
          <option value='가수'>가수</option>
        </select>
        <input
          type='search'
          placeholder='search..'
          ref={searchRef}
          onChange={() => {
            setPageNum(1);
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
            <div className={styles.btn}></div>
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
        <Page_num_screen
          resultNum={resultNum}
          pageNum={pageNum}
          onPagePlus={plusPage}
          onPageMinus={minusPage}
        />
      </section>
    </>
  );
};

export default App_add;
