import React from 'react';
import styles from './app_inform.module.css';

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
      <h1>{userData.name}</h1>
    </>
  );
};

export default App_inform;
