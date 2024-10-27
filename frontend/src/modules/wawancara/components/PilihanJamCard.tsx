import React from "react";

interface PilihanWaktuProps {
  variant?: "omahti" | "himakom";
  onSelect: () => void;
}

const PilihanWaktuCard = ({ variant = "omahti", onSelect }: PilihanWaktuProps) => {
  const foo =
    variant === "himakom" ? (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-lavender">
        Himakom
      </div>
    ) : (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-orange">
        OmahTI
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-custom-gray-dark rounded-lg p-4 w-full"> 
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-4">
        {/* Dynamic Title */}
        {foo}
        <button
          onClick={onSelect}
          className="bg-custom-gray text-custom-silver px-12 py-2 rounded-md text-sm tracking-wide hover:bg-gray-500"
        >
          Pilih
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full h-[350px] bg-white"></div>
    </div>
  );
};

export default PilihanWaktuCard;
