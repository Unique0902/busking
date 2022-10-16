import React from 'react';
import styles from './apply.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Apply = (props) => {
  let { userId } = useParams();
  return (
    <>
      <h1>hi</h1>
    </>
  );
};

export default Apply;
