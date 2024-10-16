"use client";

import Image from "next/image";
import { useState } from "react";

export default function Logout () {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a 
        className="w-full flex justify-center items-center gap-[17px] bg-custom-gray-dark py-[14px] px-[10px] rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-2 hover:bg-custom-gray-light"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-6 h-6">
          <Image
            src="/assets/components/logout.svg"
            width={24}
            height={24}
            alt="Logout icon"
            style={{
              filter: isHovered ? 'invert(100%)' : 'none',
              transition: 'filter 0.2s ease-in-out'
            }}
          />
        </div>
        <p
          className={`font-poppins-medium ${isHovered ? 'text-black' : 'text-custom-silver'}`}
          style={{
            transition: 'color 0.2s ease-in-out'
          }}
        >
          Log Out
        </p>
      </a>
    </>
  );
}