import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './app_busking.module.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

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
  let navigate = useNavigate();
  const [buskingData, setBuskingData] = useState(null);
  useEffect(() => {
    buskingRepository.syncBuskingData(userId, (data) => {
      setBuskingData(data);
    });
  }, []);
  return (
    <>
      <section className={styles.shareSec}>
        <div className={styles.qr}>
          <img
            src='https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=https://www.happykoo.net'
            alt=''
          />
        </div>
        <div className={styles.url}>공유url: www.naver.com</div>
      </section>
      <section className={styles.list}>
        <div>1</div>
        <div>블랙핑크</div>
        <div>불장난</div>
        <div>15</div>
        <div>신청자</div>
        <div>신청시간</div>
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
