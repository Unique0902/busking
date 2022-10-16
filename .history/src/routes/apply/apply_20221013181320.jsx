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
  const [resultNum2, setResultNum2] = useState(0);
  const [nowPageResults, setNowPageResults] = useState([]);
  const [nowPageResults2, setNowPageResults2] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageNum2, setPageNum2] = useState(1);
  const [appliance, setAppliance] = useState([]);
  const [applianceLength, setApplianceLength] = useState(0);
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
  const plusPage2 = () => {
    if (pageNum2 < resultNum2 / 6) {
      setPageNum2(pageNum2 + 1);
      setNowPageResults2(results.slice((pageNum2 - 1) * 6, pageNum2 * 6));
    }
  };
  const minusPage2 = () => {
    if (pageNum2 !== 1) {
      setPageNum2(pageNum2 - 1);
      setNowPageResults2(results.slice((pageNum2 - 1) * 6, pageNum2 * 6));
    }
  };

  useEffect(() => {
    if (buskingData && buskingData.appliance) {
      setAppliance(Object.values(buskingData.appliance));
      setApplianceLength(Object.values(buskingData.appliance).length);
      setResultNum2(Object.values(buskingData.appliance).length);
    }
  }, [
    buskingData,
    buskingData &&
      buskingData.appliance &&
      Object.values(buskingData.appliance).length,
  ]);

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
  useEffect(() => {
    if (playlistData) {
      playlistData.songs && setResults(Object.values(playlistData.songs));
    } else {
    }
  }, [playlistData]);
  return (
    <section className={styles.body}>
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
                <h1>신청곡 리스트</h1>
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
                          onSongClick={(sid) => {
                            if (buskingData.appliance) {
                              const applyArr = Object.values(
                                buskingData.appliance
                              );
                              const song = applyArr.find(
                                (song) => song.sid == sid
                              );
                              if (song) {
                                console.log(1);
                                buskingRepository.applyOldBuskingSong(
                                  userId,
                                  sid,
                                  buskingData.appliance[sid].cnt,
                                  () => {}
                                );
                              } else {
                                console.log(2);
                                buskingRepository.applyNewBuskingSong(
                                  userId,
                                  result.title,
                                  result.artist,
                                  sid,
                                  () => {}
                                );
                              }
                            } else {
                              console.log(3);
                              buskingRepository.applyNewBuskingSong(
                                userId,
                                result.title,
                                result.artist,
                                sid,
                                () => {
                                  console.log('와이라노');
                                }
                              );
                            }
                          }}
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
              <section className={styles.results}>
                <h1>신청된곡 리스트</h1>
                <ul>
                  <li className={styles.description}>
                    <div className={styles.index}>index</div>
                    <div className={styles.name2}>이름</div>
                    <div className={styles.artist2}>아티스트</div>
                    <div className={styles.appliance}>신청자수</div>
                    <div className={styles.btn}></div>
                  </li>
                  {appliance &&
                    appliance
                      .slice((pageNum2 - 1) * 6, pageNum2 * 6)
                      .map((result) => (
                        <SearchResult
                          key={appliance.indexOf(result)}
                          index={
                            appliance.indexOf(result) + 1 + (pageNum2 - 1) * 6
                          }
                          result={result}
                          btnText='나도신청'
                          onSongClick={(sid) => {
                            console.log(buskingData.appliance);
                            if (buskingData.appliance) {
                              const applyArr = Object.values(
                                buskingData.appliance
                              );
                              const song = applyArr.find(
                                (song) => song.id == sid
                              );
                              if (song) {
                                buskingRepository.applyOldBuskingSong(
                                  userId,
                                  sid,
                                  buskingData.appliance[sid].cnt,
                                  () => {}
                                );
                              } else {
                                buskingRepository.applyNewBuskingSong(
                                  userId,
                                  result.title,
                                  result.artist,
                                  sid,
                                  () => {}
                                );
                              }
                            } else {
                              buskingRepository.applyNewBuskingSong(
                                userId,
                                result.title,
                                result.artist,
                                sid,
                                () => {}
                              );
                            }
                          }}
                        />
                      ))}
                </ul>
                <Page_num_screen
                  resultNum={resultNum2}
                  pageNum={pageNum2}
                  onPagePlus={plusPage2}
                  onPageMinus={minusPage2}
                />
              </section>
            </section>
          </section>
        ) : (
          <h1>버스킹이 존재하지않습니다.</h1>
        )}
      </section>
    </section>
  );
};

export default Apply;
