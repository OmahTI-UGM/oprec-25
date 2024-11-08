// next and react modules

// fetch
import { hasEnrolled } from "@/utils/auth";
import { useEffect, useState } from "react";

interface ScheduleSlot {
  id: string; // ID of the tanggal item
  sesi: Date; // Date object of the session's jam time
  himakom: boolean;
}

interface JadwalWawancaraProps {
  variant: "himakom" | "omahti";
  disabled?: boolean;
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
  variant,
  wawancara,
  disabled = false,
  selectedSlot,
  onSlotSelect,
}) => {
  const [loading, setLoading] = useState(true);
  const [enrolledHimakom, setEnrolledHimakom] = useState<any | null>(null);
  const [enrolledOmahti, setEnrolledOmahti] = useState<any | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      const { hasHimakom, hasOmahti } = await hasEnrolled();
      setEnrolledHimakom(hasHimakom);
      setEnrolledOmahti(hasOmahti);
      setLoading(false);
    };
    checkEnrollment();
  }, []);

  return (
    <div className="relative h-auto w-full rounded-md bg-custom-silver p-4">
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
            <div key={item._id} className={`${disabled && 'opacity-80'}`}>
              <h3
                className={`mb-2 text-center text-base font-semibold ${variant === "himakom" ? "text-custom-blue" : "text-custom-orange"}`}
              >
                {day}
              </h3>
              <h3
                className={`mb-2 text-center text-xl font-semibold ${variant === "himakom" ? "text-custom-blue" : "text-custom-orange"}`}
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
                      onSlotSelect(session._id, jamDate, item.himakom)
                    }
                    className={`mb-2 w-full rounded py-2 ${
                      selectedSlot?.id === session._id &&
                      selectedSlot?.sesi.getTime() === jamDate.getTime()
                        ? variant === "himakom"
                          ? "bg-custom-blue text-custom-silver"
                          : `bg-custom-orange text-custom-silver hover:bg-custom-orange/80 ${disabled && 'hover:bg-custom-orange'}`
                        : "bg-custom-gray-light text-custom-black transition-colors hover:bg-custom-gray-light/80"
                    } ${disabled && "opacity-80 hover:bg-custom-gray-light"}`}
                    disabled={disabled}
                  >
                    {timeString}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* overlay if user hasn't picked a division */}
      {((variant === "himakom" && !enrolledHimakom) ||
        (variant === "omahti" && !enrolledOmahti)) && (
        <div className="absolute inset-0 grid place-items-center bg-custom-black/80 p-4 backdrop-blur-sm transition-all">
          <h1
            className={`text-center transition-opacity duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            } text-custom-silver`}
          >
            Isi divisi pilihanmu sebelum memilih jadwal wawancara.
          </h1>
        </div>
      )}
    </div>
  );
};

export default JadwalWawancara;
