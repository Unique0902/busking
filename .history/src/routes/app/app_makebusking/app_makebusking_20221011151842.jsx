import React from 'react';
import styles from './app_makebusking.module.css';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const App_makebusking = ({ buskingRepository }) => {
  const [playlistArr, setPlaylistArr] = useState([]);
  const selectRef = useRef();
  const numRef = useRef();
  const nameRef = useRef();
  let navigate = useNavigate();
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
    userId,
  ] = useOutletContext();
  useEffect(() => {
    if (playlists) {
      setPlaylistArr(Object.values(playlists));
    }
  }, [playlists]);
  return (
    <>
      <h1 className={styles.mainTitle}>버스킹하기</h1>
      <section>
        <div className={styles.option}>
          <h4 className={styles.title}>플레이리스트 선택</h4>
          <select name='playlists' ref={selectRef} className={styles.select}>
            {playlistArr.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.option}>
          <h4 className={styles.title}>최대 곡수 제한</h4>
          <input
            type='number'
            ref={numRef}
            name=''
            id=''
            className={styles.num}
          />
        </div>
        <div className={styles.option}>
          <h4 className={styles.title}>방 제목 설정</h4>
          <input
            type='text'
            ref={nameRef}
            name=''
            id=''
            className={styles.text}
          />
        </div>
      </section>
      <button
        className={styles.btn}
        onClick={() => {
          const playlistId = selectRef.current.value;
          const num = numRef.current.value;
          const name = nameRef.current.value;
          const buskingData = { playlistId, maxNum: num, name };
          buskingRepository.makeBusking(userId, buskingData, () => {
            navigate('/busking');
          });
        }}
      >
        시작
      </button>
    </>
  );
};

export default App_makebusking;
