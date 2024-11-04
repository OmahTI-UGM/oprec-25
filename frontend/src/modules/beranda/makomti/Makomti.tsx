import React from 'react';

interface MakomtiProps {
  makomti: string;
}

const Makomti: React.FC<MakomtiProps> = ({ makomti }) => {
  return (
    <>
      <h1>tiris {makomti}</h1>
    </>
  );
};

export default Makomti;
