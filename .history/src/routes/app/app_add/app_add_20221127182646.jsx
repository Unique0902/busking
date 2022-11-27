import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
const App_add = ({ lastfm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
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
      <section className='border-gray-600 border-b pb-4'>
        <h1 className='font-sans text-white text-3xl font-semibold'>
          노래추가
        </h1>
      </section>
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
          <div
            className='relative'
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              className='text-blue-500 text-2xl ml-3'
            />
            {isHovering && (
              <p className='absolute  font-sans text-xs text-gray-600'>
                Api 특성상 제목, 가수명을 영어로 <br />
                입력하시면 더 잘나옵니다.
              </p>
            )}
          </div>
        </section>
        <section className='w-full'>
          <ul>
            <li className='flex flex-row justify-between text-center px-2 py-1'>
              <div className=' basis-1/12'>index</div>
              <div className='basis-7/12 '>이름</div>
              <div className='basis-1/4 '>아티스트</div>
              <div className='basis-1/12'></div>
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
