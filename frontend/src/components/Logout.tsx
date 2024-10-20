"use client";

import Image from "next/image";
import { useState } from "react";

export default function Logout() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        className=" bg-custom-gray-dark hover:bg-custom-gray-light flex w-full cursor-pointer items-center justify-center gap-[17px] rounded-lg px-[10px] py-[14px] transition-all duration-200 ease-in-out hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative size-6">
          <Image
            src="/assets/components/logout.svg"
            width={24}
            height={24}
            alt="Logout icon"
            style={{
              filter: isHovered ? "invert(100%)" : "none",
              transition: "filter 0.2s ease-in-out",
            }}
          />
        </div>
        <p
          className={`font-poppins-medium ${isHovered ? "text-black" : "text-custom-silver"}`}
          style={{
            transition: "color 0.2s ease-in-out",
          }}
        >
          Log Out
        </p>
      </a>
    </>
  );
}
