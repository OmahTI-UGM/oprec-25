"use client";

import { useState } from "react";
import Title from "./Title";
import Image from "next/image";

export default function Navbar() {
  const [selectedNav, setSelectedNav] = useState(null);
  const nav = ["Division", "Interview"];
  const handleClick = (nav) => {
    setSelectedNav(nav);
  };

  return (
    <>
      <nav className="block w-full px-3 py-4 lg:hidden">
        <Title />
        {/* Nav Button */}
        <div className="mt-3 flex w-full items-center justify-between font-poppins-medium">
          <div className="flex grow gap-2">
            {nav.map((item, index) => (
              <div key={index} className="grow">
                <div
                  onClick={() => handleClick(item)}
                  className={`flex items-center justify-center gap-1 border border-custom-gray-dark px-2 py-1.5 text-sm ${selectedNav === item ? "bg-gray-100" : ""}`}
                >
                  <Image
                    src="/assets/components/logout.svg"
                    width={16}
                    height={16}
                    alt="Nav icon"
                  />
                  <span className="truncate">{item}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-2 flex gap-2">
            <button className="border border-custom-gray-dark p-1.5">
              <Image
                src="/assets/components/logout.svg"
                width={20}
                height={20}
                alt="Logout icon"
              />
            </button>
            <button className="border border-custom-gray-dark p-1.5">
              <Image
                src="/assets/components/logout.svg"
                width={20}
                height={20}
                alt="Settings icon"
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
