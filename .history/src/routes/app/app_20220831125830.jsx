import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Outlet } from 'react-router-dom';
import App_header from '../../components/app_header/app_header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App({ authService, playlistRepository }) {
  const [userName, setUserName] = useState('');
  const [playlists, setPlaylists] = useState(null);
  const [userId, setUserId] = useState('');
  const [nowPlaylist, setNowPlaylist] = useState(null);
  let navigate = useNavigate();
  const logout = () => {
    authService.logout();
  };
  const addSongToPlaylist = () => {};
  const addBasicPlaylist = () => {
    const playlist = {
      id: Date.now(),
      name: 'playlist',
    };
    playlistRepository.makePlaylist(userId, playlist);
  };
  useEffect(() => {
    if (!userId) {
      return;
    }
    playlistRepository.syncPlaylist(userId, (playlists) => {
      setPlaylists(playlists);
      if (playlists) {
        setNowPlaylist(Object.values(playlists)[0]);
      }
    });
  }, [userId, playlistRepository]);
  useEffect(() => {
    authService.onAuthChange(
      (user) => {
        if (user) {
          setUserName(user.displayName);
          setUserId(user.uid);
        } else {
          navigate('/');
        }
      },
      [authService, userId]
    );
  });
  return (
    <section className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <App_header
          logout={logout}
          userName={userName}
          playlists={playlists}
          addBasicPlaylist={addBasicPlaylist}
          nowPlaylist={nowPlaylist}
        />
        <Outlet context={[playlists, setPlaylists, addSongToPlaylist]} />
      </main>
    </section>
  );
}

export default App;
