import { MapPin } from "lucide-react";

interface WaktuPilihanCardProps {
  variant?: 'omahti' | 'himakom';
  tanggal: string;
  jam: string;
  lokasi?: string;
}

const WaktuPilihanCard = ({
  variant = "omahti",
  tanggal,
  jam,
  lokasi = "IUP Room",
}: WaktuPilihanCardProps) => {
  
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

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-custom-gray-dark p-2 text-xs text-custom-silver sm:p-4 sm:text-base">
      <div className="relative flex w-full items-center justify-between gap-1">
        {/* OMAHTI OR HIMAKOM */}
        {variant}

        {/* date on large screens */}
        <DateIndicator
          tanggal={formatDate(tanggal)}
          className="hidden sm:block"
        />

        {/* LOCATION AND TIME */}
        <div className="flex gap-1 *:text-sm *:sm:text-base">
          {/* location */}
          <div className="flex items-center gap-0.5 rounded-sm bg-custom-black p-2 pr-2.5">
            <MapPin className="h-3.5 sm:h-4" />
            {lokasi}
          </div>

          {/* time */}
          <div className="rounded-sm bg-custom-black p-2">
            {formatTime(jam)}
          </div>
        </div>
      </div>

      {/* DATE on small screens */}
      <DateIndicator
        tanggal={formatDate(tanggal)}
        className="block sm:hidden"
      />
    </div>
  );
};

const DateIndicator = ({
  tanggal,
  className,
}: {
  tanggal: string;
  className?: string;
}) => <h1 className={`text-lg font-semibold ${className}`}>{tanggal}</h1>;

// functions to extract date and time from ISO string
// ---------------------------------------------------------
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
// ---------------------------------------------------------

export default WaktuPilihanCard;
