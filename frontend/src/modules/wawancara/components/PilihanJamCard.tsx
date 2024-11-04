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
  himakom: boolean;
}

const PilihanWaktuCard = ({
  variant = "omahti",
  wawancara,
}: PilihanWaktuProps) => {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [popupType, setPopupType] = useState<"gagal" | "berhasil" | "konfirmasi">("gagal");

  const handleSlotSelect = (id: string, sesi: Date, himakom: boolean) => {
    setSelectedSlot({ id, sesi, himakom });
    setPopupType("konfirmasi");
  };

  const fooClass = `rounded-md bg-custom-black p-2 text-sm sm:text-base`;
  const foo =
    variant === "himakom" ? (
      <div className={`${fooClass} text-custom-blue`}>
        Himakom
      </div>
    ) : (
      <div className={`${fooClass} text-custom-orange`}>
        OmahTI
      </div>
    );

  // Determine if the popup should be clickable
  const isPopupClickable = selectedSlot !== null;

  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-custom-gray-dark p-2 sm:p-4">
      <div className="mb-2 flex w-full items-center justify-between sm:mb-4">
        {foo}

        {/* Apply pointer-events based on selectedSlot */}
        <div
          style={{
            pointerEvents: isPopupClickable ? "auto" : "none", // gabisa mencet kalo blm milih waktu
          }}
        >
          <Popup type={popupType} selectedSlot={selectedSlot} />
        </div>
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
