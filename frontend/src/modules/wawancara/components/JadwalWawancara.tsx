// next and react modules
import Cookies from "js-cookie";
import React, { use } from "react";

// fetch
import { getPilihanWawancara } from "@/utils/fetch";

interface ScheduleSlot {
  id: string; // ID of the tanggal item
  sesi: Date; // Date object of the session's jam time
  himakom: boolean;
}

interface JadwalWawancaraProps {
  category: "Himakom" | "OmahTI";
  wawancara: {
    himakom: boolean;
    _id: string; // ID for the tanggal item
    tanggal: Date;
    sesi: {
      jam: Date;
      dipilihOleh: string[];
      slotDivisi: {
        backend: { sisaSlot: number; lokasi: string };
        frontend: { sisaSlot: number; lokasi: string };
        uiux: { sisaSlot: number; lokasi: string };
        dsai: { sisaSlot: number; lokasi: string };
        cp: { sisaSlot: number; lokasi: string };
        mobapps: { sisaSlot: number; lokasi: string };
        gamedev: { sisaSlot: number; lokasi: string };
        _id: string;
      };
      _id: string;
    }[];
  }[];
  selectedSlot: ScheduleSlot | null;
  onSlotSelect: (id: string, sesi: Date, himakom: boolean) => void;
}

const JadwalWawancara: React.FC<JadwalWawancaraProps> = ({
  category,
  wawancara,
  selectedSlot,
  onSlotSelect,
}) => {
  const accessToken = Cookies.get("accessToken");
  const pilihanWawancara = use(getPilihanWawancara(accessToken as string));

  return (
    <div className="h-auto w-full rounded-md bg-custom-silver p-4">
      <div className="grid grid-cols-1 gap-4 overflow-x-auto xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {wawancara.map((item) => {
          const tanggalDate = new Date(item.tanggal);

          if (isNaN(tanggalDate.getTime())) {
            console.error("Invalid date:", item.tanggal);
            return null;
          }

          const day = tanggalDate.toLocaleDateString("id-ID", {
            weekday: "long",
          });
          const date = tanggalDate.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
          });

          return (
            <div key={item._id}>
              <h3
                className={`mb-2 text-center text-base font-semibold ${category === "Himakom" ? "text-custom-blue" : "text-custom-orange"}`}
              >
                {day}
              </h3>
              <h3
                className={`mb-2 text-center text-xl font-semibold ${category === "Himakom" ? "text-custom-blue" : "text-custom-orange"}`}
              >
                {date}
              </h3>
              {item.sesi.map((session) => {
                const jamDate = new Date(session.jam);

                if (isNaN(jamDate.getTime())) {
                  console.error("Invalid time:", session.jam);
                  return null;
                }

                const timeString = jamDate.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <button
                    key={session._id}
                    onClick={() =>
                      onSlotSelect(item._id, jamDate, item.himakom)
                    }
                    className={`mb-2 w-full rounded py-2 ${
                      selectedSlot?.id === item._id &&
                      selectedSlot?.sesi.getTime() === jamDate.getTime()
                        ? category === "Himakom"
                          ? "bg-custom-blue text-custom-silver"
                          : "bg-custom-orange text-custom-silver"
                        : "bg-custom-gray-light text-custom-black transition-colors hover:bg-custom-gray-light/80"
                    }`}
                    disabled={
                      item.himakom
                        ? pilihanWawancara.filteredHima && `true`
                        : pilihanWawancara.filteredOti && `true`
                    }
                    // disabled={item.himakom ? pilihanWawancara.filteredHima.includes(item._id) : pilihanWawancara.filteredOti.includes(item._id)}
                  >
                    {timeString}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JadwalWawancara;
