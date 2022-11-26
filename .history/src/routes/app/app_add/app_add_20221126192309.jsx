import React, { useRef, useState } from 'react';
import styles from './app_add.module.css';
import { useOutletContext } from 'react-router-dom';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';

const App_add = ({ lastfm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const searchRef = useRef();
  const selectRef = useRef();
  const [addSongToPlaylist, removeSongInPlaylist, nowPlaylist] =
    useOutletContext();
  const search = (pageNum2) => {
    if (searchRef.current.value) {
      if (selectRef.current.value === '제목') {
        lastfm
          .searchSongByName(searchRef.current.value, pageNum2)
          .then((result) => {
            setSearchResults(result.trackmatches.track);
            setResultNum(parseInt(result['opensearch:totalResults']));
          });
      } else if (selectRef.current.value === '가수') {
        lastfm
          .searchSongByArtist(searchRef.current.value, pageNum2)
          .then((result) => {
            setSearchResults(result.trackmatches.track);
            setResultNum(parseInt(result['opensearch:totalResults']));
          });
      }
    }
  };
  const plusPage = () => {
    search(pageNum + 1);
    setPageNum(pageNum + 1);
  };
  const minusPage = () => {
    if (pageNum !== 1) {
      search(pageNum - 1);
      setPageNum(pageNum - 1);
    }
  };
  return (
    <>
      <section className=''>
        <h1 className='font-sans text-white text-3xl font-semibold'>
          노래추가
        </h1>
      </section>
      <section className='bg-white rounded-2xl m-8 p-6'>
        <section className='relative flex justify-center items-center mb-6'>
          <select
            ref={selectRef}
            className=' border-black border-2 rounded-xl p-2 font-sans text-lg mr-4'
            onChange={() => {
              setPageNum(1);
              search(1);
            }}
          >
            <option value='제목'>제목</option>
            <option value='가수'>가수</option>
          </select>
          <input
            type='search'
            className='border-black border-2 p-2 rounded-xl w-16'
            placeholder='search..'
            ref={searchRef}
            onChange={() => {
              setPageNum(1);
              search(1);
            }}
          />
          <p className='absolute right-8 font-sans text-xs text-gray-300'>
            Api 특성상 제목, 가수명을 영어로 <br />
            입력하시면 더 잘나옵니다.
          </p>
        </section>
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
                  index={searchResults.indexOf(result) + 1 + (pageNum - 1) * 6}
                  result={result}
                  btnText='추가'
                  onSongClick={addSongToPlaylist}
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
      </section>
    </>
  );
};

export default App_add;
