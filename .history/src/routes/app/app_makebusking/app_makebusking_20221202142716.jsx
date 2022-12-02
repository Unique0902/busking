import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBar from '../../../components/titleBar/titleBar';
import MainSec from '../../../components/mainSec/mainSec';
import MainRow from '../../../components/mainRow/mainRow';

const App_makebusking = ({ buskingRepository }) => {
  const [playlistArr, setPlaylistArr] = useState(null);
  const [maxNum, setMaxNum] = useState(10);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
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
    addBasicPlaylist,
  ] = useOutletContext();
  const [roomTitle, setRoomTitle] = useState('');
  useEffect(() => {
    if (userData) {
      setRoomTitle(`${userData.name}님의 버스킹`);
    }
  }, [userData]);
  useEffect(() => {
    if (playlists) {
      setPlaylistArr(Object.values(playlists));
    }
  }, [playlists]);
  useEffect(() => {
    if (playlistArr) {
      setSelectedPlaylist(playlistArr[0].id);
    }
  }, [playlistArr]);
  useEffect(() => {
    buskingRepository.syncBuskingData(userId, (buskingData) => {
      console.log(buskingData);
      if (buskingData) {
        navigate('/busking/app/busking');
      }
    });
  }, []);
  const startBusking = () => {
    const playlistId = selectRef.current.value;
    const name = nameRef.current.value;
    if (playlistId && maxNum && name) {
      buskingRepository.makeBusking(userId, playlistId, maxNum, name, () => {
        console.log('safh');
      });
    } else {
      if (!playlistId) {
        alert('플레이 리스트를 등록해주세요!');
      } else if (!maxNum) {
        alert('최대 곡수를 등록해주세요!');
      } else if (!name) {
        alert('방이름을 등록해주세요!');
      }
    }
  };
  return (
    <>
      <TitleBar text={'버스킹하기'} />
      {!nowPlaylist ? (
        <MainSec isFullSize={false}>
          <h3 className='font-sans font-semibold text-xl text-black'>
            플레이리스트가 존재하지 않습니다. 플레이 리스트를 추가해주세요.
          </h3>
          <button
            onClick={() => {
              addBasicPlaylist();
            }}
            className='mt-4 font-sans text-2xl font-normal border border-black rounded-xl px-5 py-3 hover:bg-gray-200'
          >
            추가하기
          </button>
        </MainSec>
      ) : (
        <MainSec isFullSize={false}>
          <MainRow title={'플레이리스트 선택'}>
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
            </select>{' '}
          </MainRow>
          <MainRow title={'최대 곡수 제한'}>
            <input
              type='number'
              ref={numRef}
              value={maxNum}
              onChange={(e) => {
                setMaxNum(e.target.value);
              }}
              className='border-black border-2 p-2 rounded-xl w-2/12 font-sans text-lg'
            />
          </MainRow>
          <MainRow title={'방 제목 설정'}>
            <input
              type='text'
              ref={nameRef}
              value={roomTitle}
              onChange={(e) => {
                setRoomTitle(e.target.value);
              }}
              className='border-black border-2 p-2 rounded-xl w-1/3 font-sans text-lg'
            />
          </MainRow>
          <button
            onClick={() => {
              startBusking();
            }}
            className='  hover:bg-gray-200 text-start w-full font-sans text-2xl font-normal text-blue-500 py-5 border-gray-300 border-b relative'
          >
            버스킹 시작하기
          </button>
        </MainSec>
      )}
    </>
  );
};

export default App_makebusking;
