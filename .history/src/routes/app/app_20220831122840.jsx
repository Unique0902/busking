import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Outlet } from 'react-router-dom';
import App_header from '../../components/app_header/app_header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App({ authService, playlistRepository }) {
  const [userName, setUserName] = useState('');
  const [playlists, setPlaylists] = useState({});
  const [userId, setUserId] = useState('');
  const [noewPlaylist, setNowPlaylist] = useState({});
  let navigate = useNavigate();
  const logout = () => {
    authService.logout();
  };
  const addSongToPlaylist = () => {};
  useEffect(() => {
    if (!userId) {
      return;
    }
    playlistRepository.syncPlaylist(userId, (playlists) => {
      if (playlists) {
        setPlaylists(playlists);
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
        <App_header logout={logout} userName={userName} playlists={playlists} />
        <Outlet context={[playlists, setPlaylists, addSongToPlaylist]} />
      </main>
    </section>
  );
}

export default App;
