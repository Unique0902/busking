import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import InformRow from '../../components/InformRow';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';
export default function AppInform({
  userRepository,
  playlistRepository,
  buskingRepository,
}) {
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    playlists,
  ] = useOutletContext();
  const { userData } = useUserDataContext();
  const { uid, logout } = useAuthContext();
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (userData) {
      setTime(new Date(userData.date));
    }
  }, [userData]);
  return (
    <>
      <TitleBar text={'내 정보'} />
      <MainSec>
        <InformRow title={'닉네임'} titleColor={'gray'} onClick={() => {}}>
          <p className='font-sans text-lg text-black font-normal'>
            {userData && userData.name}
          </p>
        </InformRow>
        <InformRow title={'가입일자'} titleColor={'gray'} onClick={() => {}}>
          <p className='font-sans text-lg text-black font-normal'>
            {time &&
              `${time.getFullYear()}년 ${
                time.getMonth() + 1
              }월 ${time.getDate()}일`}
          </p>
        </InformRow>
        <InformRow
          title={'회원 탈퇴'}
          titleColor={'red'}
          onClick={() => {
            if (window.confirm('정말 탈퇴하시겠습니까?')) {
              userRepository.removeUser(uid, () => {
                playlistRepository.removeUserPlaylists(uid);
                buskingRepository.removeBusking(uid, () => {});
                logout();
              });
            }
          }}
        ></InformRow>
      </MainSec>
    </>
  );
}
