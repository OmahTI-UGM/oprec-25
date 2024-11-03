"use client";
import React from "react";
import JadwalWawancara from "./JadwalWawancara";
import Popup from "./Popup";



interface PilihanWaktuProps {
  variant?: "omahti" | "himakom";
  onSelect?: () => void;
}

const PilihanWaktuCard = ({ variant = "omahti", onSelect }: PilihanWaktuProps) => {
  const foo =
    variant === "himakom" ? (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-blue">
        Himakom
      </div>
    ) : (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-orange">
        OmahTI
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-custom-gray-dark rounded-lg p-4 w-full"> 
      <div className="flex justify-between items-center w-full mb-4">
        {foo}
          
        <Popup type="gagal" />

      </div>
      <JadwalWawancara category={variant === "himakom" ? "Himakom" : "OmahTI"} />
    </div>
  );
};

export default PilihanWaktuCard;
