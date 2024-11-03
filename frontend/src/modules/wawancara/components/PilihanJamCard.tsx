"use client";
import React, { useState } from "react";
import JadwalWawancara from "./JadwalWawancara";
import Popup from "./Popup";

interface PilihanWaktuProps {
  variant?: "omahti" | "himakom";
  wawancara: any;
  onSelect?: () => void;
}

interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean
}

const PilihanWaktuCard = ({ variant = "omahti", wawancara }: PilihanWaktuProps) => {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [popupType, setPopupType] = useState<"gagal" | "berhasil" | "konfirmasi">("gagal");
  const handleSlotSelect = (id: string, sesi: Date, himakom: boolean) => {
    console.log(id, sesi, himakom);
    setSelectedSlot({ id, sesi, himakom });
    setPopupType("konfirmasi");
  };

  const foo =
    variant === "himakom" ? (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-blue">Himakom</div>
    ) : (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-orange">OmahTI</div>
    );

  return (
    <div className="flex flex-col items-center bg-custom-gray-dark rounded-lg p-4 w-full">
      <div className="flex justify-between items-center w-full mb-4">
        {foo}
        
        {/* Pass selectedSlot to Popup */}
        <Popup type={popupType} selectedSlot={selectedSlot}/>
      </div>
      
      {/* Pass selectedSlot and handleSlotSelect to JadwalWawancara */}
      <JadwalWawancara 
        category={variant === "himakom" ? "Himakom" : "OmahTI"} 
        wawancara={wawancara} 
        selectedSlot={selectedSlot} 
        onSlotSelect={handleSlotSelect} 
      />
    </div>
  );
};

export default PilihanWaktuCard;
