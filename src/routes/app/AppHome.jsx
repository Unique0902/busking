import React from 'react';
import MainSec from '../../components/MainSec';
import { useUserDataContext } from '../../context/UserDataContext';

export default function AppHome() {
  const { userData } = useUserDataContext();
  return (
    <>
      <MainSec>
        <div className=''>
          <h1 className='text-black text-3xl font-sans font-bold'>
            어서오세요! {userData && userData.name} 님!
          </h1>
        </div>
      </MainSec>
    </>
  );
}
