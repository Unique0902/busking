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
        <p>{userData.name}</p>
      </div>
    </>
  );
};

export default App_inform;
