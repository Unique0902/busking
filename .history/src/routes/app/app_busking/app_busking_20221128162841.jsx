import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './app_busking.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faForwardStep,
  faBackwardStep,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
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
  const playBtnStyle = 'mx-3 text-4xl text-black';
  return (
    <>
      <section className='border-gray-600 border-b items-center pb-4 flex flex-row'>
        <h1 className='font-sans text-white text-3xl font-semibold'>
          {userData && `${userData.name}님의 버스킹`}
        </h1>
        <h2 className='font-sans ml-10 text-gray-300 text-xl font-bold'>
          곡 신청 하러가기
        </h2>
        <img
          className='ml-8'
          src={`https://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=${url}`}
        />
        <div className='ml-4'>신청 URL: {url}</div>
      </section>
      <section className='w-3/4 m-auto bg-gray-300 rounded-3xl text-center py-5 px-2 mt-4'>
        <div className='font-sans text-xl text-white font-medium py-2 px-2 w-3/4 m-auto rounded-xl bg-gray-500 mb-2'>
          {isSinging ? (
            <>
              <p>{nowSong && `${nowSong.title} - ${nowSong.artist}`}</p>
            </>
          ) : (
            <p>정지됨..</p>
          )}
        </div>
        <div className='text-center'>
          <button
            className={playBtnStyle}
            onClick={() => {
              if (isSinging) {
                if (beforeSong) {
                  buskingRepository.applyBuskingSongAgain(
                    userId,
                    nowSong,
                    nowSong.sid,
                    () => {}
                  );
                  setNowSong(beforeSong);
                  setBeforeSong(null);
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faBackwardStep} className='' />
          </button>
          {isSinging ? (
            <button
              className={playBtnStyle}
              onClick={() => {
                setIsSinging(false);
              }}
            >
              <FontAwesomeIcon icon={faPause} className='' />
            </button>
          ) : (
            <button
              className={playBtnStyle}
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
              <FontAwesomeIcon icon={faPlay} className='' />
            </button>
          )}
          <button
            className={playBtnStyle}
            onClick={() => {
              if (isSinging) {
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
              }
            }}
          >
            <FontAwesomeIcon icon={faForwardStep} className='' />
          </button>
        </div>
      </section>
      <section className='bg-white rounded-2xl m-auto w-3/4 mt-8 px-10 py-5 relative'>
        <section className='relative flex justify-center items-center mb-6'>
          <h2 className='font-sans font-semibold text-xl text-zinc-500'>
            총 노래 수 {results && results.length}
          </h2>
          <div className='relative'>
            <button
              className='ml-4 bg-gray-500 py-2 px-3 text-lg rounded-lg text-white hover:scale-125'
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
          </div>
          <button
            className='ml-4 bg-gray-500 py-2 px-3 text-lg rounded-lg text-white hover:scale-125'
            onClick={() => {
              buskingRepository.removeBusking(userId, () => {
                navigate('/busking/app/makebusking');
              });
            }}
          >
            버스킹 종료
          </button>
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
    </>
  );
};

export default App_busking;
