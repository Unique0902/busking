import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';
import InfoBtn from '../../../components/infoBtn/infoBtn';
import TitleBar from '../../../components/titleBar/titleBar';
import SearchResults from '../../../components/searchResults/searchResults';
import SongTableTitles from '../../../components/songTableTitles/songTableTitles';
import MainSec from '../../../components/mainSec/mainSec';

const App_add = ({ lastfm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const searchRef = useRef();
  const selectRef = useRef();
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
      <TitleBar text={'노래추가'} />
      <MainSec isFullSize={false}>
        <h1>hi</h1>
      </MainSec>
      {!nowPlaylist ? (
        <section className='bg-white flex flex-col items-center rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
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
        </section>
      ) : (
        <section className='bg-white rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
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
              className='border-black border-2 p-2 rounded-xl w-2/5 font-sans text-lg'
              placeholder='검색어를 입력하세요..'
              ref={searchRef}
              onChange={() => {
                setPageNum(1);
                search(1);
              }}
            />
            <InfoBtn
              text={
                'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
              }
            />
          </section>
          <section className='w-full'>
            <ul>
              <SongTableTitles isApply={false} />
              <SearchResults
                isSearch={true}
                results={searchResults}
                pageNum={pageNum}
                btnText={'추가'}
                onSongClick={addSongToPlaylist}
              />
            </ul>
            <Page_num_screen
              resultNum={resultNum}
              pageNum={pageNum}
              onPagePlus={plusPage}
              onPageMinus={minusPage}
            />
          </section>
        </section>
      )}
    </>
  );
};

export default App_add;
