import React from 'react';
import styles from './apply.module.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SearchResult from '../../components/searchResult/searchResult';
import Page_num_screen from '../../components/page_num_screen/page_num_screen';

const Apply = ({
  buskingRepository,
  playlistRepository,
  userRepository,
  ipService,
}) => {
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
  const [maxNum, setMaxNum] = useState(0);
  const [ip, setIp] = useState('');
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
    ipService.getIp().then((ip1) => setIp(ip1));
  }, []);

  useEffect(() => {
    if (buskingData && buskingData.appliance) {
      setAppliance(Object.values(buskingData.appliance));
      setApplianceLength(Object.values(buskingData.appliance).length);
      setResultNum2(Object.values(buskingData.appliance).length);
    } else {
      setAppliance([]);
      setApplianceLength(0);
      setResultNum2(0);
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
      console.log('중복좀');
      buskingRepository.checkBusking(userId, (data) => {
        if (data) {
          setIsBusking(true);
        }
      });
    }
  }, [userId]);
  useEffect(() => {
    console.log('중복좀');
    if (isBusking) {
      buskingRepository.syncBuskingData(userId, (data) => {
        if (data) {
          console.log(data);
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
      console.log(userId);
      playlistRepository.syncPlaylist(userId, (data) => {
        setPlaylistData(data[buskingData.playlistId]);
      });
    }
  }, [buskingData]);
  useEffect(() => {
    if (playlistData) {
      setMaxNum(parseInt(playlistData.maxNum));
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
                                const userIp = song.applicants.find(
                                  (ap) => ap.ip == ip
                                );
                                if (!userIp) {
                                  console.log(userIp);
                                  buskingRepository.applyOldBuskingSong(
                                    userId,
                                    sid,
                                    ip,
                                    song.cnt,
                                    song.applicants,
                                    () => {}
                                  );
                                } else {
                                  console.log(userIp);
                                  window.alert('이미 투표하셨습니다!');
                                }
                              } else {
                                console.log(2);
                                buskingRepository.applyNewBuskingSong(
                                  userId,
                                  result.title,
                                  result.artist,
                                  sid,
                                  ip,
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
                                ip,
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
                            if (buskingData.appliance) {
                              const applyArr = Object.values(
                                buskingData.appliance
                              );
                              const song = applyArr.find(
                                (song) => song.sid == sid
                              );
                              console.log(song);
                              if (song) {
                                console.log(1);
                                const userIp = song.applicants.find(
                                  (ap) => ap.ip == ip
                                );
                                if (!userIp) {
                                  console.log(userIp);
                                  buskingRepository.applyOldBuskingSong(
                                    userId,
                                    sid,
                                    ip,
                                    song.cnt,
                                    song.applicants,
                                    () => {}
                                  );
                                } else {
                                  console.log(userIp);
                                  window.alert('이미 투표하셨습니다!');
                                }
                              } else {
                                console.log(2);
                                buskingRepository.applyNewBuskingSong(
                                  userId,
                                  result.title,
                                  result.artist,
                                  sid,
                                  ip,
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
                                ip,
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
