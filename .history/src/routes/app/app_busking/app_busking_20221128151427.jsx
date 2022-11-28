import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './app_busking.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import SearchResult from '../../../components/searchResult/searchResult';
import Page_num_screen from '../../../components/page_num_screen/page_num_screen';
import ArrangeMenu from '../../../components/arrangeMenu/arrangeMenu';

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
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState(false);
  const [isSinging, setIsSinging] = useState(false);
  useEffect(() => {
    if (userId && !isBusking) {
      buskingRepository.syncBuskingData(userId, (data) => {
        if (data) {
          setIsBusking(true);
        } else {
          navigate('/busking/app/makebusking');
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
      setUrl(`https://unique0902.github.io/BuskingApply?uid=${userId}`);
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
  useEffect(() => {
    if ((pageNum - 1) * 6 + 1 > resultNum) {
      if (resultNum == 0) {
        return;
      }
      setPageNum(pageNum - 1);
    }
  }, [resultNum]);
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
              {beforeSong && (
                <button
                  onClick={() => {
                    buskingRepository.applyBuskingSongAgain(
                      userId,
                      nowSong,
                      nowSong.sid,
                      () => {}
                    );
                    setNowSong(beforeSong);
                    setBeforeSong(null);
                  }}
                >
                  이전 곡
                </button>
              )}
              <button
                onClick={() => {
                  if (results) {
                    if (nowSong) {
                      setBeforeSong(nowSong);
                    }
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
      <section className='bg-white rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
        <section className='relative flex justify-center items-center mb-6'>
          <h2 className='font-sans font-semibold text-xl text-zinc-500'>
            총 노래 수 {results && results.length}
          </h2>
          <button
            className='ml-5 bg-blue-600 py-2 px-3 text-lg rounded-lg text-white hover:scale-125'
            onClick={() => {
              setIsShowArrangeMenu(true);
            }}
          >
            정렬
          </button>
          {isShowArrangeMenu && (
            <ArrangeMenu
              setIsShowArrangeMenu={setIsShowArrangeMenu}
              results={results}
              setResults={setResults}
              isBusking={true}
            />
          )}
        </section>
        <section className='w-full'>
          <ul>
            <li className='flex flex-row justify-between text-center px-2 py-1'>
              <div className=' basis-1/12'>index</div>
              <div className='basis-7/12 '>이름</div>
              <div className='basis-1/4 '>아티스트</div>
              <div className='basis-1/12'></div>
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
            navigate('/busking/app/makebusking');
          });
        }}
      >
        버스킹 종료
      </button>
    </>
  );
};

export default App_busking;
