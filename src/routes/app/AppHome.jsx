import React from 'react';
import { useOutletContext } from 'react-router-dom';
import MainSec from '../../components/MainSec';
import { useUserDataContext } from '../../context/UserDataContext';

export default function AppHome(props) {
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    playlists,
  ] = useOutletContext();
  const { userData } = useUserDataContext();
  return (
    <>
      <MainSec>
        <div className=''>
          <h1 className='text-black text-3xl font-sans font-bold'>
            어서오세요! {userData && userData.name} 님!
          </h1>
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
        {/* <button>3곡 담은 playlist1으로 버스킹 하러 가기</button> */}
      </MainSec>
    </>
  );
}