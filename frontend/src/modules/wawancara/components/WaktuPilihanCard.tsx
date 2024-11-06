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
  let variantLabel;
  if (variant === "himakom") {
    variantLabel = (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-lavender">
        Himakom
      </div>
    );
  } else {
    variantLabel = (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-orange">
        OmahTI
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-custom-gray-dark p-1.5 text-xs text-custom-silver sm:p-4 sm:text-base">
      <div className="relative flex w-full items-center justify-between gap-1">
        {/* OMAHTI OR HIMAKOM */}
        {variantLabel}

        {/* Date on large screens */}
        <DateIndicator tanggal={tanggal} className="hidden sm:block" />

        {/* LOCATION AND TIME */}
        <div className="flex gap-1">
          {/* Location */}
          <div className="flex items-center gap-0.5 rounded-sm bg-custom-black p-1.5 pr-2.5">
            <MapPin className="h-4" />
            {lokasi}
          </div>

          {/* Time */}
          <div className="rounded-sm bg-custom-black p-1.5">{jam}</div>
        </div>
      </div>

      {/* Date on small screens */}
      <DateIndicator tanggal={tanggal} className="block sm:hidden" />
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

export default WaktuPilihanCard;
