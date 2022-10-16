import React from 'react';
import styles from './app_busking.module.css';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

const App_makebusking = (props) => {
  const [playlistArr, setPlaylistArr] = useState([]);
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
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
          <select name='playlists' className={styles.select}>
            {playlistArr.map((playlist) => (
              <option value={playlist.name}>{playlist.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.option}>
          <h4 className={styles.title}>최대 곡수 제한</h4>
          <input type='number' name='' id='' className={styles.num} />
        </div>
        <div className={styles.option}>
          <h4 className={styles.title}>방 제목 설정</h4>
          <input type='text' name='' id='' className={styles.text} />
        </div>
      </section>
      <button className={styles.btn} onClick={() => {}}>
        시작
      </button>
    </>
  );
};

export default App_makebusking;
