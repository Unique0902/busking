import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import PageNumScreen from '../../components/PageNumScreen';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import SearchResults from '../../components/SearchResults';
import SongTableTitles from '../../components/SongTableTitles';
import MainSec from '../../components/MainSec';
import SongSearchBar from '../../components/SongSearchBar';
import ArrangeMenuBtn from '../../components/ArrangeMenuBtn';
import { useMediaQuery } from 'react-responsive';
import { usePlaylistContext } from '../../context/PlaylistContext';

export default function AppPlaylist(props) {
  const [results, setResults] = useState(null);
  // const [nowPageResults, setNowPageResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [searchCategory, setSearchCategory] = useState('제목');
  const { nowPlaylist, addBasicPlaylist, removeSongInPlaylist } =
    usePlaylistContext();
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
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
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
      // setNowPageResults(results.slice((pageNum - 1) * 6, pageNum * 6));
    }
  };
  const minusPage = () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
      // setNowPageResults(results.slice((pageNum - 1) * 6, pageNum * 6));
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
            <ArrangeMenuBtn
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
              {isPc && <SongTableTitles isApply={false} />}
              <SearchResults
                isSearch={false}
                results={results}
                pageNum={pageNum}
                btnText={'제거'}
                onSongClick={removeSongInPlaylist}
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
