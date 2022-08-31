import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './app_playlist.module.css';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';
import { useEffect } from 'react';

const App_playlist = (props) => {
  const [results, setResults] = useState([]);
  const [nowPageResults, setNowPageResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const searchRef = useRef();
  const selectRef = useRef();
  const [addSongToPlaylist, removeSongInPlaylist, nowPlaylist] =
    useOutletContext();
  useEffect(() => {
    nowPlaylist && setResults(Object.values(nowPlaylist.songs));
  }, [nowPlaylist]);
  // useEffect(() => {
  //   results && setNowPageResults(results.slice((pageNum - 1) * 6, pageNum * 6));
  // }, [results]);
  useEffect(() => {
    setResultNum(results.length);
  }, [results.length]);

  const search = () => {
    if (searchRef.current.value) {
      if (selectRef.current.value === '제목') {
        setResults(
          Object.values(nowPlaylist.songs).filter((song) =>
            song.title.toLowerCase().includes(searchRef.current.value)
          )
        );
        setResultNum(results.length);
      } else if (selectRef.current.value === '가수') {
        setResults(
          Object.values(nowPlaylist.songs).filter((song) =>
            song.artist.toLowerCase().includes(searchRef.current.value)
          )
        );
        setResultNum(results.length);
      }
    } else {
      setResults(Object.values(nowPlaylist.songs));
    }
  };
  const plusPage = () => {
    if (pageNum < resultNum / 6) {
      setPageNum(pageNum + 1);
      setNowPageResults(results.slice((pageNum - 1) * 6, pageNum * 6));
    }
  };
  const minusPage = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
      setNowPageResults(results.slice((pageNum - 1) * 6, pageNum * 6));
    }
  };
  return (
    <>
      <section className={styles.pageTitle}>
        <h1 className={styles.pageTitleText}>Playlist</h1>
      </section>
      <header>
        <button>검색</button>
        <button>정렬</button>
      </header>
      {isShowSearchBar && (
        <section className={styles.searchBar}>
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
        </section>
      )}

      <section className={styles.results}>
        <ul>
          <li className={styles.description}>
            <div className={styles.index}>index</div>
            <div className={styles.name}>이름</div>
            <div className={styles.artist}>아티스트</div>
            <div className={styles.btn}></div>
          </li>
          {results &&
            results
              .slice((pageNum - 1) * 6, pageNum * 6)
              .map((result) => (
                <SearchResult
                  key={results.indexOf(result)}
                  index={results.indexOf(result) + 1 + (pageNum - 1) * 6}
                  result={result}
                  btnText='제거'
                  onSongClick={removeSongInPlaylist}
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

export default App_playlist;
