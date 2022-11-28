import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
  const time = new Date(userData.date);
  return (
    <>
      <section className='border-gray-600 border-b pb-4'>
        <h1 className='font-sans text-white text-3xl font-semibold'>내 정보</h1>
      </section>
      <section className='bg-white rounded-2xl m-auto w-full mt-8 p-10 relative'>
        <div className='flex flex-row items-center pb-3 border-gray-300 border-b relative'>
          <h2 className='font-sans text-2xl font-normal text-gray-500 w-36'>
            닉네임
          </h2>
          <p>{userData && userData.name}</p>
          <FontAwesomeIcon
            icon={faChevronRight}
            className='absolute right-5 text-xl'
          />
        </div>
        <div className='flex flex-row items-center py-3 border-gray-300 border-b relative'>
          <h2 className='font-sans text-2xl font-normal text-gray-500 w-36'>
            가입일자
          </h2>
          <p>{`${time.getFullYear()}년 ${
            time.getMonth() + 1
          }월 ${time.getDate()}일`}</p>
          <FontAwesomeIcon
            icon={faChevronRight}
            className='absolute right-5 text-xl'
          />
        </div>
        <button
          className='font-sans hover:bg-gray-200 text-2xl font-normal text-red-500 flex flex-row w-full items-center py-3 border-gray-300 border-b relative'
          onClick={() => {
            userRepository.removeUser(userId, () => {
              if (window.confirm('정말 탈퇴하시겠습니까?')) {
                playlistRepository.removeUserPlaylists(userId);
                buskingRepository.removeBusking(userId, () => {});
                authService.logout();
              }
            });
          }}
        >
          회원 탈퇴
          <FontAwesomeIcon
            icon={faChevronRight}
            className='absolute right-5 text-xl'
          />
        </button>
      </section>
    </>
  );
};

export default App_inform;