import React from 'react';
import styles from './app_home.module.css';
import { useOutletContext } from 'react-router-dom';

const App_home = (props) => {
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
    userId,
  ] = useOutletContext();
  return (
    <>
      <section className='mx-16 px-5 py-5 rounded-xl bg-white flex-grow '>
        <div className={styles.title}>
          <h1 className='text-black text-3xl font-sans font-bold'>
            어서오세요! {userData && userData.name} 님!
          </h1>
          {/* <button className={styles.addBtn}>playlist 추가</button> */}
        </div>
        {/* <section className={styles.section}>
          <h2>이 플레이리스트는 지금까지 12명에게 노래를 받았어요!</h2>
          <h2>이 플레이리스트로 당신이 버스킹한 횟수는 5번 입니다!</h2>
          <h2>주요 버스킹 방법: 온라인</h2>
          <h2>
            이 리스트에서 가장 많이 부른 노래는 miss a 의 bad girl good girl
            입니다
          </h2>
        </section> */}
      </section>
      <section>
        {/* <button>3곡 담은 playlist1으로 버스킹 하러 가기</button> */}
      </section>
    </>
  );
};

export default App_home;
