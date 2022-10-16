import React from 'react';
import styles from './apply.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Apply = ({ buskingRepository, playlistRepository, userRepository }) => {
  const [isBusking, setIsBusking] = useState(false);
  const [buskingData, setBuskingData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  let { userId } = useParams();
  useEffect(() => {
    if (buskingData) {
      buskingData.songs && setResults(Object.values(buskingData.songs));
    } else {
      setResults([]);
    }
  }, []);
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
                <select>
                  <option value='제목'>제목</option>
                  <option value='가수'>가수</option>
                </select>
                <input type='search' placeholder='search..' />
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
          </section>
        ) : (
          <h1>버스킹이 존재하지않습니다.</h1>
        )}
      </section>
    </>
  );
};

export default Apply;
