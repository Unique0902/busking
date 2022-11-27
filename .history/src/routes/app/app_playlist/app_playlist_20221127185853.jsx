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
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
  ] = useOutletContext();
  useEffect(() => {
    if (nowPlaylist) {
      nowPlaylist.songs
        ? setResults(Object.values(nowPlaylist.songs))
        : setResults([]);
    } else {
      setResults([]);
    }
  }, [nowPlaylist]);
  useEffect(() => {
    setResultNum(results.length);
  }, [results.length]);

  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > resultNum) {
      if (resultNum == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [resultNum]);

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
      <section className='border-gray-600 border-b pb-4'>
        <h1 className='font-sans text-white text-3xl font-semibold'>
          플레이리스트 관리
        </h1>
      </section>
      <section className='bg-white rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
        <section className='relative flex justify-center items-center mb-6'>
          <select
            ref={selectRef}
            className=' border-black border-2 rounded-xl p-2 font-sans text-lg mr-4'
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
            placeholder='검색어를 입력하세요..'
            className='border-black border-2 p-2 rounded-xl w-2/5 font-sans text-lg'
            ref={searchRef}
            onChange={() => {
              setPageNum(1);
              search();
            }}
          />
          <button>정렬</button>
        </section>
        <h2>플레이리스트 노래 수 {results.length}</h2>
        <section className='w-full'>
          <ul>
            <li className='flex flex-row justify-between text-center px-2 py-1'>
              <div className=' basis-1/12'>index</div>
              <div className='basis-7/12 '>이름</div>
              <div className='basis-1/4 '>아티스트</div>
              <div className='basis-1/12'></div>
            </li>
            {results &&
              results
                .slice((pageNum - 1) * 6, pageNum * 6)
                .map((result) => (
                  <SearchResult
                    key={results.indexOf(result)}
                    index={results.indexOf(result) + 1}
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
      </section>

      {nowPlaylist && nowPlaylist.length != 0 ? (
        <>
          <button
            className={styles.btn}
            onClick={() => {
              results.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                else if (a.title.toLowerCase() < b.title.toLowerCase())
                  return -1;
                else return 0;
              });
              setResults([...results]);
            }}
          >
            제목 문자순 정렬
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              results.sort(function (a, b) {
                if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
                else if (a.artist.toLowerCase() < b.artist.toLowerCase())
                  return -1;
                else return 0;
              });
              setResults([...results]);
            }}
          >
            가수 문자순 정렬
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              results.sort(function (a, b) {
                return a.id - b.id;
              });
              setResults([...results]);
            }}
          >
            시간순 정렬
          </button>
        </>
      ) : (
        <>
          <h1>플레이리스트가 존재하지않습니다. 추가해주세요</h1>
        </>
      )}
    </>
  );
};

export default App_playlist;
