import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './app_busking.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';

const App_busking = ({ buskingRepository }) => {
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
    userId,
  ] = useOutletContext();
  const [url, setUrl] = useState('');
  let navigate = useNavigate();
  const [isBusking, setIsBusking] = useState(false);
  const [buskingData, setBuskingData] = useState(null);
  const [appliance, setAppliance] = useState(null);
  const [results, setResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [nowPageResults, setNowPageResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [beforeSong, setBeforeSong] = useState(null);
  const [nowSong, setNowSong] = useState(null);
  const [isSinging, setIsSinging] = useState(false);
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
          setAppliance(data.appliance);
        }
      });
    }
  }, [isBusking]);
  useEffect(() => {
    if (userId) {
      setUrl(`http://localhost:3000/apply/${userId}`);
    }
  }, [userId]);
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
    // console.log('hi');
    // console.log(appliance);
    if (appliance) {
      setResults(Object.values(appliance));
      setResultNum(Object.values(appliance).length);
    } else {
      setResults([]);
    }
  }, [appliance, appliance && Object.values(appliance).length]);
  return (
    <>
      <section className={styles.shareSec}>
        <div className={styles.qr}>
          <img
            src={`https://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=${url}`}
            alt=''
          />
        </div>
        <div className={styles.url}>공유url: {url}</div>
      </section>
      <section className={styles.nowSongSec}>
        <div className={styles.nowSong}>
          {isSinging ? (
            <>
              <div>{nowSong.title}</div>
              <div>{nowSong.artist}</div>
            </>
          ) : (
            <>
              <h2>시작 버튼을 누르세요.</h2>
            </>
          )}
        </div>
        <div className={styles.songBtns}>
          {isSinging ? (
            <>
              <button>이전 곡</button>
              <button
                onClick={() => {
                  console.log(results);
                  if (results) {
                    setNowSong({ ...results[0] });
                    buskingRepository.removeBuskingSong(
                      userId,
                      results[0].sid,
                      () => {}
                    );
                  }
                }}
              >
                다음 곡
              </button>
              <button
                onClick={() => {
                  setIsSinging(false);
                }}
              >
                정지
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsSinging(true);
                  if (!nowSong && results) {
                    setNowSong({ ...results[0] });
                    buskingRepository.removeBuskingSong(
                      userId,
                      results[0].sid,
                      () => {}
                    );
                  }
                }}
              >
                노래 시작하기
              </button>
            </>
          )}
        </div>
      </section>
      <section className={styles.results}>
        <h1>신청된곡 리스트</h1>
        <ul>
          <li className={styles.description}>
            <div className={styles.index}>index</div>
            <div className={styles.name}>이름</div>
            <div className={styles.artist}>아티스트</div>
            <div className={styles.appliance}>신청자수</div>
            <div className={styles.btnSec}></div>
          </li>
          {results &&
            results.slice((pageNum - 1) * 6, pageNum * 6).map((result) => (
              <SearchResult
                key={results.indexOf(result)}
                index={results.indexOf(result) + 1}
                result={result}
                btnText='제거'
                onSongClick={(sid) => {
                  buskingRepository.removeBuskingSong(userId, sid, () => {});
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
      <button
        className={styles.btn}
        onClick={() => {
          results.sort(function (a, b) {
            if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
            else if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
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
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
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
            return a.id - b.id;
          });
          setResults([...results]);
        }}
      >
        신청 시간순 정렬
      </button>
      <button
        className={styles.btn}
        onClick={() => {
          results.sort(function (a, b) {
            return b.cnt - a.cnt;
          });
          setResults([...results]);
        }}
      >
        신청자순 정렬
      </button>
      <button
        className={styles.cancelBtn}
        onClick={() => {
          buskingRepository.removeBusking(userId, () => {
            navigate('/app/home');
          });
        }}
      >
        버스킹 종료
      </button>
    </>
  );
};

export default App_busking;
