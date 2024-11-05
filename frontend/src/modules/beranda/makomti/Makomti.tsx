// src/modules/beranda/makomti/Makomti.tsx
import React from 'react';
import { Makomti as MakomtiData } from '@/helpers/DataMakomti'; // Import the data
import Image from 'next/image';
import himakomLogo from "@/logos/himakom.svg";
import omahtiLogo from "@/logos/omahti.svg";
import omahti from "@/assets/beranda/about/omahti.webp";
import himakom from "@/assets/beranda/about/himakom.webp";

interface MakomtiProps {
  makomti: string;
}

const Makomti: React.FC<MakomtiProps> = ({ makomti }) => {
  const data = MakomtiData.find(item => item.id === makomti);
  const logo = makomti === "himakom" ? himakomLogo : omahtiLogo;
  const bgImage = makomti === "himakom" ? himakom : omahti;

  if (!data) {
    return <h1>Data tidak ditemukan untuk {makomti}</h1>;
  }

  return (
    <section className="relative">
      <Image src={bgImage} alt="" width={0} height={0} className='w-full absolute left-0 top-0 right-0' />
      <Image src={logo} alt={`${data.nama} logo`} width={0} height={0} className='w-auto h-5' />
      <h1>{data.namaLengkap}</h1>
      <p>{data.desc}</p>
      <h2>Manfaat:</h2>
      <ul>
        {Array.from(data.manfaat).map((manfaat, index) => (
          <li key={index}>{manfaat}</li>
        ))}
      </ul>
      <h2>Kegiatan:</h2>
      <ul>
        {Array.from(data.kegiatan).map((kegiatan, index) => (
          <li key={index}>{kegiatan}</li>
        ))}
      </ul>
      <h2>Divisi:</h2>
      <ul>
        {Array.from(data.divisi).map((divisi, index) => (
          <li key={index}>{divisi}</li>
        ))}
      </ul>
    </section>
  );
};

export default Makomti;
