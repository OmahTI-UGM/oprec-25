"use client";

import Image from "next/image";
import Logout from "./Logout";
import { useState } from "react";
import Title from "./Title";

export default function Sidebar() {

  const [selectedNav, setSelectedNav] = useState(null);
  const nav = ["Division", "Interview", "Help Center"];
  const handleClick = (nav) => {
    setSelectedNav(nav);
  };

  return (
    <>
      <nav className="min-w-[20%] h-screen pb-[7vh] px-[3vh] pt-[3vh] sticky top-0 hidden bg-custom-black lg:flex flex-col justify-between border-r-2 border-custom-gray-dark">
        <section>
          
          <Title />

          {/* Nav Button */}
          <div className="font-poppins-medium flex flex-col  gap-[2vh] text-[1.8vh]">
            {nav.map((nav, index) => (
              <div key={index}>
                <div
                  onClick={() => handleClick(nav)}
                  className={`pl-[10px] items-center rounded-md gap-[17px] flex py-[1.5vh] cursor-pointer transition-all duration-200 
                    ${selectedNav === nav ? 'bg-custom-gray-dark border-2 border-custom-gray-dark' : ''}`}
                  style={{
                    transition: 'color 0.2s ease-in-out'
                  }}
                >
                  <Image
                    src="/assets/components/logout.svg"
                    width={24}
                    height={24}
                    alt="Logout icon"
                  />
                  <h1>{nav}</h1>
                </div>
                {selectedNav !== nav && <hr className="border-custom-gray-dark" />} {/* Add <hr> for unselected items */}
              </div>
            ))}

          </div>
        </section>
        
        {/* Log Out button */}
        <Logout />
      </nav>
    </>
  );
}