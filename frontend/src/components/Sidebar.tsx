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
      <nav className="bg-custom-black border-custom-gray-dark sticky top-0 hidden h-screen min-w-[20%] flex-col justify-between border-r-2 px-[3vh] pb-[7vh] pt-[3vh] lg:flex">
        <section>
          <Title />

          {/* Nav Button */}
          <div className="font-poppins-medium mt-[10vh] flex flex-col  gap-[2vh] text-[1.8vh]">
            {nav.map((nav, index) => (
              <div key={index}>
                <div
                  onClick={() => handleClick(nav)}
                  className={`flex cursor-pointer items-center gap-[17px] rounded-md py-[1.5vh] pl-[10px] transition-all duration-200 
                    ${selectedNav === nav ? "bg-custom-gray-dark border-custom-gray-dark border-2" : ""}`}
                  style={{
                    transition: "color 0.2s ease-in-out",
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
                {selectedNav !== nav && (
                  <hr className="border-custom-gray-dark" />
                )}{" "}
                {/* Add <hr> for unselected items */}
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
