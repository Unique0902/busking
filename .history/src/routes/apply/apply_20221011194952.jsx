import React from 'react';
import styles from './apply.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Apply = ({ buskingRepository }) => {
  const [isBusking, setIsBusking] = useState(false);
  const [buskingData, setBuskingData] = useState(null);
  let { userId } = useParams();
  useEffect(() => {
    if (userId && !isBusking) {
      buskingRepository.checkBusking(userId, (data) => {
        if (data) {
          setIsBusking(true);
        }
      });
    }
  }, [userId]);
  return (
    <>
      <h1>hi</h1>
    </>
  );
};

export default Apply;
