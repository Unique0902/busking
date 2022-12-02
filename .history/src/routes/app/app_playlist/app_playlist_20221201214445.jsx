import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';
import { useEffect } from 'react';
import ArrangeMenu from '../../../components/arrangeMenu/arrangeMenu';
import TitleBar from '../../../components/titleBar/titleBar';
import SearchResults from '../../../components/searchResults/searchResults';
import SongTableTitles from '../../../components/songTableTitles/songTableTitles';
import MainSec from '../../../components/mainSec/mainSec';
import SongSearchBar from '../../../components/songSearchBar/songSearchBar';
import ArrangeMenuBtn from '../../../components/arrangeMenuBtn/arrangeMenuBtn';

const App_playlist = (props) => {
  const [results, setResults] = useState(null);
  const [nowPageResults, setNowPageResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState(false);
  const searchRef = useRef();
  const selectRef = useRef();
  const [searchWord, setSearchWord] = useState('');
  const [searchCategory, setSearchCategory] = useState('제목');
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
    userId,
    addBasicPlaylist,
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
    results && setResultNum(results.length);
  }, [results]);

  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > resultNum) {
      if (resultNum == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [resultNum]);

  const search = () => {
    if (nowPlaylist && nowPlaylist.songs) {
      if (searchWord) {
        if (searchCategory === '제목') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.title.toLowerCase().includes(searchWord)
            )
          );
          setResultNum(results.length);
        } else if (searchCategory === '가수') {
          setResults(
            Object.values(nowPlaylist.songs).filter((song) =>
              song.artist.toLowerCase().includes(searchWord)
            )
          );
          setResultNum(results.length);
        }
      } else {
        setResults(Object.values(nowPlaylist.songs));
      }
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
  const onSearchBarChange = () => {
    setPageNum(1);
    search();
  };
  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      {!nowPlaylist ? (
        <MainSec isFullSize={false}>
          <h3 className='font-sans font-semibold text-xl text-black'>
            플레이리스트가 존재하지 않습니다. 플레이 리스트를 추가해주세요.
          </h3>
          <button
            onClick={() => {
              addBasicPlaylist();
            }}
            className='mt-4 font-sans text-2xl font-normal border border-black rounded-xl px-5 py-3 hover:bg-gray-200'
          >
            추가하기
          </button>
        </MainSec>
      ) : (
        <MainSec isFullSize={false}>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            onSearchBarChange={onSearchBarChange}
          >
            {/* <div className='relative'>
              <button
                className='ml-5 bg-blue-600 py-2 px-3 text-lg rounded-lg text-white hover:scale-125'
                onClick={() => {
                  setIsShowArrangeMenu(true);
                }}
              >
                정렬
              </button>
              {isShowArrangeMenu && (
                <ArrangeMenu
                  setIsShowArrangeMenu={setIsShowArrangeMenu}
                  results={results}
                  setResults={setResults}
                  isBusking={false}
                />
              )}
            </div> */}
            <ArrangeMenuBtn
              setIsShowArrangeMenu={setIsShowArrangeMenu}
              isShowArrangeMenu={isShowArrangeMenu}
              results={results}
              setResults={setResults}
              isBusking={false}
            />
          </SongSearchBar>
          <h2 className='font-sans font-semibold mb-2 text-xl text-zinc-500'>
            총 노래 수 {results && results.length}
          </h2>
          <section className='w-full'>
            <ul>
              <SongTableTitles isApply={false} />
              <SearchResults
                isSearch={false}
                results={results}
                pageNum={pageNum}
                btnText={'제거'}
                onSongClick={removeSongInPlaylist}
              />
            </ul>
            <Page_num_screen
              resultNum={resultNum}
              pageNum={pageNum}
              onPagePlus={plusPage}
              onPageMinus={minusPage}
            />
          </section>
        </MainSec>
      )}
    </>
  );
};

export default App_playlist;
