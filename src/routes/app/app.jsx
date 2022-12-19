import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';

function App({ playlistRepository }) {
  const [playlists, setPlaylists] = useState(null);
  const [nowPlaylist, setNowPlaylist] = useState(null);
  const [nowPlaylistId, setNowPlaylistId] = useState(null);
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const [url, setUrl] = useState('');
  const { uid } = useAuthContext();
  let location = useLocation();
  const isLgMediaQuery = useMediaQuery({
    query: '(min-width:1024px)',
  });

  useEffect(() => {
    if (!isLgMediaQuery) {
      setIsShowSideBar(false);
    }
  }, [isLgMediaQuery]);

  const addSongToPlaylist = (title, artist) => {
    if (nowPlaylist.length === 0) {
      alert('플레이리스트가 존재하지않습니다! 추가해주세요!');
      return;
    }
    const songArr = nowPlaylist.songs ? Object.values(nowPlaylist.songs) : [];
    const sameSong = songArr.find(
      (song) => song.title === title && song.artist === artist
    );
    if (sameSong) {
      alert('이미 추가된 노래입니다!');
    } else {
      const song = {
        id: Date.now(),
        title: title,
        artist: artist,
      };
      playlistRepository.saveSong(uid, nowPlaylist, song, () => {
        alert(`${artist}의 ${title}가 추가되었습니다.`);
      });
    }
  };

  useEffect(() => {
    if (location) {
      setUrl(location.pathname);
    }
  }, [location]);

  const removeNowPlaylist = () => {
    playlistRepository.removePlaylist(uid, nowPlaylist, () => {
      alert('제거되었습니다.');
    });
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
        setNowPlaylistId(null);
        playlistRepository.removeSong(uid, nowPlaylist, song, () => {
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
    setNowPlaylistId(playlist.id);
    playlistRepository.makePlaylist(uid, playlist);
  };
  const updateNowPlaylistName = (name) => {
    playlistRepository.updatePlaylistName(uid, nowPlaylist, name);
  };

  const addPlaylist = (name) => {
    const playlist = {
      id: Date.now(),
      name,
    };
    setNowPlaylistId(playlist.id);
    playlistRepository.makePlaylist(uid, playlist);
  };

  useEffect(() => {
    if (!uid) {
      return;
    }
    playlistRepository.syncPlaylist(uid, (playlists) => {
      if (playlists) {
        setPlaylists(playlists);
      }
    });
  }, [uid]);

  useEffect(() => {
    if (playlists) {
      if (nowPlaylistId && playlists[nowPlaylistId]) {
        setNowPlaylist(playlists[nowPlaylistId]);
      } else {
        setNowPlaylist(Object.values(playlists)[0]);
        setNowPlaylistId(Object.values(playlists)[0].id);
      }
    }
  }, [playlists]);

  return (
    <section className='flex h-screen text-black bg-gradient-to-b from-blue-500 to-mainBlue '>
      {(isLgMediaQuery || isShowSideBar) && (
        <Sidebar
          isShowSideBar={isShowSideBar}
          setIsShowSideBar={setIsShowSideBar}
        />
      )}
      <main className=' grow py-6 px-8 overflow-y-auto'>
        {url != '/busking/app/busking' && (
          <AppHeader
            playlists={playlists}
            addBasicPlaylist={addBasicPlaylist}
            setNowPlaylist={setNowPlaylist}
            nowPlaylist={nowPlaylist}
            removeNowPlaylist={removeNowPlaylist}
            addPlaylist={addPlaylist}
            updateNowPlaylistName={updateNowPlaylistName}
            setNowPlaylistId={setNowPlaylistId}
            isShowSideBar={isShowSideBar}
            setIsShowSideBar={setIsShowSideBar}
          />
        )}
        {url === '/busking/app/busking' && !isLgMediaQuery && (
          <AppHeader
            playlists={playlists}
            addBasicPlaylist={addBasicPlaylist}
            setNowPlaylist={setNowPlaylist}
            nowPlaylist={nowPlaylist}
            removeNowPlaylist={removeNowPlaylist}
            addPlaylist={addPlaylist}
            updateNowPlaylistName={updateNowPlaylistName}
            setNowPlaylistId={setNowPlaylistId}
            isShowSideBar={isShowSideBar}
            setIsShowSideBar={setIsShowSideBar}
          />
        )}
        <Outlet
          context={[
            addSongToPlaylist,
            removeNowPlaylist,
            removeSongInPlaylist,
            nowPlaylist,
            playlists,
            addBasicPlaylist,
          ]}
        />
      </main>
    </section>
  );
}

export default App;
