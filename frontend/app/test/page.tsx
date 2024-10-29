import React from 'react';
import { NextPage } from 'next';
import About from '@/modules/beranda/About';
import Quotes from '@/modules/beranda/Quotes';

const BlankPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen bg-custom-black">
      {/* About component for Himakom */}
      <Quotes category="OmahTI" />
      
      {/* About component for OmahTI */}
      <Quotes category="Himakom" />
    </div>
  );
};

export default BlankPage;