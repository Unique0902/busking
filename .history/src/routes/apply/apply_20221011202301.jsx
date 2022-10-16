import React from 'react';
import styles from './apply.module.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SearchResult from '../../components/searchResult/searchResult';
import Page_num_screen from '../../components/page_num_screen/page_num_screen';

const Apply = ({ buskingRepository, playlistRepository, userRepository }) => {
  const [isBusking, setIsBusking] = useState(false);
  const [buskingData, setBuskingData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [nowPageResults, setNowPageResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  let { userId } = useParams();
  const searchRef = useRef();
  const selectRef = useRef();
  const search = () => {
    if (searchRef.current.value) {
      if (selectRef.current.value === '제목') {
        setResults(
          Object.values(playlistData.songs).filter((song) =>
            song.title.toLowerCase().includes(searchRef.current.value)
          )
        );
        setResultNum(results.length);
      } else if (selectRef.current.value === '가수') {
        setResults(
          Object.values(playlistData.songs).filter((song) =>
            song.artist.toLowerCase().includes(searchRef.current.value)
          )
        );
        setResultNum(results.length);
      }
    } else {
      setResults(Object.values(playlistData.songs));
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
  useEffect(() => {
    if (buskingData) {
      buskingData.songs && setResults(Object.values(buskingData.songs));
    } else {
      setResults([]);
    }
  }, [buskingData]);
  useEffect(() => {
    setResultNum(results.length);
  }, [results.length]);

  useEffect(() => {
    if (userId && !isBusking) {
      buskingRepository.checkBusking(userId, (data) => {
        if (data) {
          setIsBusking(true);
        }
      });
    }
  }, [userId]);
  useEffect(() => {
    if (isBusking) {
      buskingRepository.syncBuskingData(userId, (data) => {
        if (data) {
          setBuskingData(data);
        }
      });
      userRepository.syncUserData(userId, (data) => {
        setName(data.name);
      });
    }
  }, [isBusking]);
  useEffect(() => {
    if (buskingData) {
      playlistRepository.syncPlaylist(userId, (data) => {
        setPlaylistData(data[buskingData.playlistId]);
      });
    }
  }, [buskingData]);
  return (
    <>
      <section>
        {isBusking ? (
          <section>
            <section>
              <p>{name}님의 버스킹</p>
            </section>
            <section>
              <p>{playlistData && playlistData.name}</p>
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
                          index={
                            results.indexOf(result) + 1 + (pageNum - 1) * 6
                          }
                          result={result}
                          btnText='신청'
                          onSongClick={() => {}}
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
          </section>
        ) : (
          <h1>버스킹이 존재하지않습니다.</h1>
        )}
      </section>
    </>
  );
};

export default Apply;
