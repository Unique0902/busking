import React from 'react';
import styles from './app_inform.module.css';
import { useOutletContext } from 'react-router-dom';

const App_inform = (props) => {
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
  ] = useOutletContext();
  return (
    <>
      <div>
        <h2>닉네임</h2>
        <p>{userData && userData.name}</p>
      </div>
      <div>
        <h2>가입일자</h2>
        <p>{userDate && userData.date}</p>
      </div>
      <button>회원 탈퇴</button>
    </>
  );
};

export default App_inform;