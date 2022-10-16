import React from 'react';
import styles from './app_inform.module.css';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const App_inform = ({
  authService,
  userRepository,
  playlistRepository,
  buskingRepository,
}) => {
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
    userId,
  ] = useOutletContext();
  let navigate = useNavigate();
  return (
    <>
      <div>
        <h2>닉네임</h2>
        <p>{userData && userData.name}</p>
      </div>
      <div>
        <h2>가입일자</h2>
        <p>{userData && userData.date}</p>
      </div>
      <button
        onClick={() => {
          userRepository.removeUser(userId, () => {
            playlistRepository.removeUserPlaylists(userId);
            buskingRepository.removeBusking(userId, () => {});
            authService.logout();
          });
        }}
      >
        회원 탈퇴
      </button>
    </>
  );
};

export default App_inform;
