import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageNumScreen from '../../components/PageNumScreen';
import InfoBtn from '../../components/InfoBtn';
import TitleBar from '../../components/TitleBar';
import SearchResults from '../../components/SearchResults';
import SongTableTitles from '../../components/SongTableTitles';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/SongSearchBar';
import { useMediaQuery } from 'react-responsive';

export default function AppAdd({ lastfm }) {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [searchCategory, setSearchCategory] = useState('제목');
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    playlists,
    addBasicPlaylist,
  ] = useOutletContext();
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const search = (pageNum2) => {
    if (searchWord) {
      if (searchCategory === '제목') {
        lastfm.searchSongByName(searchWord, pageNum2).then((result) => {
          setSearchResults(result.trackmatches.track);
          setResultNum(parseInt(result['opensearch:totalResults']));
        });
      } else if (searchCategory === '가수') {
        lastfm.searchSongByArtist(searchWord, pageNum2).then((result) => {
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
  const onSearchBarChange = () => {
    setPageNum(1);
    search(1);
  };
  return (
    <>
      <TitleBar text={'노래추가'} />
      {!nowPlaylist ? (
        <MainSec>
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
        <MainSec>
          <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            onSearchBarChange={onSearchBarChange}
          >
            <InfoBtn
              text={
                'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
              }
            />
          </SongSearchBar>
          <section className='w-full'>
            <ul>
              {isPc && <SongTableTitles isApply={false} />}
              <SearchResults
                isSearch={true}
                results={searchResults}
                pageNum={pageNum}
                btnText={'추가'}
                onSongClick={addSongToPlaylist}
              />
            </ul>
            <PageNumScreen
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
}
