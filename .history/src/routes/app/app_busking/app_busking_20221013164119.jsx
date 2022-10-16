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
  const [buskingData, setBuskingData] = useState(null);
  const [appliance, setAppliance] = useState(null);
  const [results, setResults] = useState([]);
  const [resultNum, setResultNum] = useState(0);
  const [nowPageResults, setNowPageResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    buskingRepository.syncBuskingData(userId, (data) => {
      setBuskingData(data);
      setAppliance(data.appliance);
    });
  }, []);
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
    console.log('hi');
    console.log(appliance);
    if (appliance) {
      setResults(Object.values(appliance));
      setResultNum(Object.values(appliance).length);
    }
  }, [appliance && Object.values(appliance).length]);
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
                index={results.indexOf(result) + 1 + (pageNum - 1) * 6}
                result={result}
                btnText='나도신청'
                onSongClick={(sid) => {
                  if (buskingData.appliance) {
                    const applyArr = Object.values(buskingData.appliance);
                    const song = applyArr.find((song) => song.id == sid);
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
          resultNum={resultNum}
          pageNum={pageNum}
          onPagePlus={plusPage}
          onPageMinus={minusPage}
        />
      </section>
      <button className={styles.btn}>신청자순 정렬</button>
      <button className={styles.btn}>시간순 정렬</button>
      <button
        className={styles.cancelBtn}
        onClick={() => {
          buskingRepository.removeBusking(userId, () => {
            navigate('/app/home');
          });
        }}
      >
        종료
      </button>
    </>
  );
};

export default App_busking;
