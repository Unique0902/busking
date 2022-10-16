import React from 'react';
import styles from './apply.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Apply = ({ buskingRepository }) => {
  const [isBusking, setIsBusking] = useState(false);
  let { userId } = useParams();
  useEffect(() => {
    if (userId) {
      buskingRepository.checkBusking(userId, (buskingData) => {
        if (buskingData) {
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
