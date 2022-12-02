import React from 'react';

const TitlaBar = ({ text }) => {
  return (
    <section className='border-gray-600 border-b pb-4'>
      <h1 className='font-sans text-white text-3xl font-semibold'>{text}</h1>
    </section>
  );
};

export default TitlaBar;
