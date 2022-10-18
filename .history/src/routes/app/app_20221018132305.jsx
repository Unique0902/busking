import Sidebar from '../../components/sidebar/sidebar';
import './app.module.css';
import styles from './app.module.css';
import { Outlet } from 'react-router-dom';
import App_header from '../../components/app_header/app_header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App({
  authService,
  userRepository,
  playlistRepository,
  buskingRepository,
}) {
  const [userName, setUserName] = useState('');
  const [playlists, setPlaylists] = useState(null);
  const [userId, setUserId] = useState('');
  const [nowPlaylist, setNowPlaylist] = useState(null);
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  const logout = () => {
    authService.logout();
  };
  const addSongToPlaylist = (title, artist) => {
    if (!nowPlaylist) {
      return;
    }
    const songArr = nowPlaylist.songs ? Object.values(nowPlaylist.songs) : [];
    const sameSong = songArr.find(
      (song) => song.title == title && song.artist == artist
    );
    if (sameSong) {
      alert('이미 추가된 노래입니다!');
    } else {
      const song = {
        id: Date.now(),
        title: title,
        artist: artist,
      };
      playlistRepository.saveSong(userId, nowPlaylist, song, () => {
        alert(`${artist}의 ${title}가 추가되었습니다.`);
      });
    }
  };
  const removeNowPlaylist = () => {
    playlistRepository.removePlaylist(userId, nowPlaylist, () => {
      alert('제거되었습니다.');
      playlistRepository.syncPlaylist(userId, (playlists) => {
        if (playlists) {
          setPlaylists(playlists);
          setNowPlaylist(Object.values(playlists)[0]);
        }
      });
    });
    if (playlists) {
      setNowPlaylist(Object.values(playlists)[0]);
    } else {
      setNowPlaylist(null);
    }
  };
  const removeSongInPlaylist = (sid) => {
    if (!nowPlaylist) {
      return;
    }
    if (window.confirm('정말 제거하시겠습니까?')) {
      const song = Object.values(nowPlaylist.songs).find(
        (song) => song.id === sid
      );
      if (song) {
        playlistRepository.removeSong(userId, nowPlaylist, song, () => {
          window.alert('제거되었습니다.');
        });
      } else {
        console.log('노래없음');
      }
    }
  };
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
    userRepository.checkUser(userId, (isUserData) => {
      if (!isUserData) {
        navigate('/busking/makeUser');
        return;
      }
    });
    userRepository.syncUserData(userId, (data) => {
      setUserData(data);
    });

    playlistRepository.syncPlaylist(userId, (playlists) => {
      if (playlists) {
        setPlaylists(playlists);
        setNowPlaylist(Object.values(playlists)[0]);
      }
    });
  }, [userId, playlistRepository]);
  useEffect(() => {
    if (!playlists) {
      setNowPlaylist([]);
    }
  }, [playlists]);
  useEffect(() => {
    authService.onAuthChange(
      (user) => {
        if (user) {
          setUserName(user.displayName);
          setUserId(user.uid);
        } else {
          navigate('/busking/');
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
          userData={userData}
          playlists={playlists}
          addBasicPlaylist={addBasicPlaylist}
          setNowPlaylist={setNowPlaylist}
          nowPlaylist={nowPlaylist}
        />
        <Outlet
          context={[
            addSongToPlaylist,
            removeNowPlaylist,
            removeSongInPlaylist,
            nowPlaylist,
            userData,
            playlists,
            userId,
          ]}
        />
      </main>
    </section>
  );
}

export default App;
