import React from 'react';
import styles from './app_makebusking.module.css';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const App_makebusking = ({ buskingRepository }) => {
  const [playlistArr, setPlaylistArr] = useState([]);
  const selectRef = useRef();
  const numRef = useRef();
  const nameRef = useRef();
  let navigate = useNavigate();
  const [
    addSongToPlaylist,
    removeNowPlaylist,
    removeSongInPlaylist,
    nowPlaylist,
    userData,
    playlists,
    userId,
  ] = useOutletContext();
  useEffect(() => {
    if (playlists) {
      setPlaylistArr(Object.values(playlists));
      console.log('hi');
    }
  }, [playlists]);
  useEffect(() => {
    buskingRepository.syncBuskingData(userId, (buskingData) => {
      console.log('hi');
      console.log(buskingData);
      if (buskingData) {
        navigate('/busking/app/busking');
      }
    });
  }, []);
  const startBusking = () => {
    const playlistId = selectRef.current.value;
    const num = numRef.current.value;
    const name = nameRef.current.value;
    if (playlistId && num && name) {
      buskingRepository.makeBusking(userId, playlistId, num, name, () => {
        console.log('safh');
      });
    } else {
      if (!playlistId) {
        alert('플레이 리스트를 등록해주세요!');
      } else if (!num) {
        alert('최대 곡수를 등록해주세요!');
      } else if (!name) {
        alert('방이름을 등록해주세요!');
      }
    }
  };
  return (
    <>
      <section className='border-gray-600 border-b pb-4'>
        <h1 className='font-sans text-white text-3xl font-semibold'>
          버스킹하기
        </h1>
      </section>
      <section className='bg-white rounded-2xl m-auto w-3/4 mt-8 p-10 relative'>
        <div className='flex flex-row items-center pb-3 border-gray-300 border-b relative'>
          <h2 className='font-sans text-2xl font-normal text-black w-64'>
            플레이리스트 선택
          </h2>
          <select
            name='playlists'
            ref={selectRef}
            className='border border-black rounded-lg px-3 font-sans font-normal text-xl py-2'
          >
            {playlistArr &&
              playlistArr.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex flex-row items-center py-3 border-gray-300 border-b relative'>
          <h2 className='font-sans text-2xl font-normal text-black w-64'>
            최대 곡수 제한
          </h2>
          <input
            type='number'
            ref={numRef}
            value={10}
            className='border-black border-2 p-2 rounded-xl w-1/12 font-sans text-lg'
          />
        </div>
        <div className='flex flex-row items-center py-3 border-gray-300 border-b relative'>
          <h2 className='font-sans text-2xl font-normal text-black w-64'>
            방 제목 설정
          </h2>
          <input
            type='text'
            ref={nameRef}
            value={userData ? `${userData.name}님의 버스킹` : ''}
            className='border-black border-2 p-2 rounded-xl w-1/3 font-sans text-lg'
          />
        </div>
        <button
          onClick={() => {
            startBusking();
          }}
          className='  hover:bg-gray-200 text-start w-full font-sans text-2xl font-normal text-blue-500 py-5 border-gray-300 border-b relative'
        >
          버스킹 시작하기
        </button>
      </section>
    </>
  );
};

export default App_makebusking;
