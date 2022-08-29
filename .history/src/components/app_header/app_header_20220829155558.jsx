import React from 'react';
import styles from './app_header.module.css';

const App_header = (props) => {
  return (
    <>
      <header>
        <div className={styles.playlists}>playlist1</div>
        <div className={styles.users}>묵</div>
      </header>
    </>
  );
};

export default App_header;
