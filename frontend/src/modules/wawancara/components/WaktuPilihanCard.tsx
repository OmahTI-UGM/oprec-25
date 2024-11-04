import { MapPin } from "lucide-react";

interface WaktuPilihanCardProps {
  variant?: 'omahti' | 'himakom';
  datetime: string;
  lokasi?: string;
}

const WaktuPilihanCard = ({
  variant = "omahti",
  datetime,
  lokasi = "IUP Room",
}: WaktuPilihanCardProps) => {
  let foo;
  if (variant === "himakom") {
    foo = (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-lavender">
        Himakom
      </div>
    );
  } else {
    foo = (
      <div className="rounded-md bg-custom-black p-2 text-sm text-custom-orange">
        OmahTI
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-custom-gray-dark p-1.5 text-xs text-custom-silver sm:p-4 sm:text-base">
      <div className="relative flex w-full items-center justify-between gap-1">
        {/* OMAHTI OR HIMAKOM */}
        {foo}

        {/* date on large screens */}
        <DateIndicator tanggal={datetime} className="hidden sm:block" />

        {/* LOCATION AND TIME */}
        <div className="flex gap-1">
          {/* location */}
          <div className="flex items-center gap-0.5 rounded-sm bg-custom-black p-1.5 pr-2.5">
            <MapPin className="h-4" />
            {lokasi}
          </div>

          {/* time */}
          <div className="rounded-sm bg-custom-black p-1.5">{datetime}</div>
        </div>
      </div>

      {/* DATE on small screens */}
      <DateIndicator tanggal={datetime} className="block sm:hidden" />
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