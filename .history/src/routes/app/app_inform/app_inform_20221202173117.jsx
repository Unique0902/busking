import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import TitleBar from '../../../components/titleBar/titleBar';
import MainSec from '../../../components/mainSec/mainSec';
import InformRow from '../../../components/informRow/informRow';
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
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (userData) {
      setTime(new Date(userData.date));
    }
  }, [userData]);
  return (
    <>
      <TitleBar text={'내 정보'} />
      <MainSec isFullSize={true}>
        <InformRow title={'닉네임'} titleColor={'gray'} onClick={() => {}}>
          <p>{userData && userData.name}</p>
        </InformRow>
        <InformRow title={'가입일자'} titleColor={'gray'} onClick={() => {}}>
          <p>
            {time &&
              `${time.getFullYear()}년 ${
                time.getMonth() + 1
              }월 ${time.getDate()}일`}
          </p>
        </InformRow>
        <InformRow
          title={'회원 탈퇴'}
          titleColor={'red'}
          onClick={() => {}}
        ></InformRow>
        <button
          className='font-sans hover:bg-gray-200 text-2xl font-normal text-red-500 flex flex-row w-full items-center py-3 border-gray-300 border-b relative'
          onClick={() => {
            if (window.confirm('정말 탈퇴하시겠습니까?')) {
              userRepository.removeUser(userId, () => {
                playlistRepository.removeUserPlaylists(userId);
                buskingRepository.removeBusking(userId, () => {});
                authService.logout();
              });
            }
          }}
        >
          회원 탈퇴
          <FontAwesomeIcon
            icon={faChevronRight}
            className='absolute right-5 text-xl'
          />
        </button>
      </MainSec>
    </>
  );
};

export default App_inform;
