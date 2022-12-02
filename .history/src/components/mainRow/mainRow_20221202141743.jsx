import React from 'react';

const MainRow = ({ title, children }) => {
  return (
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
  );
};

export default MainRow;
