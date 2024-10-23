import { MapPin } from "lucide-react";

const WaktuPilihanCard = ({
  variant = "omahti",
  tanggal = "27 November 2024",
  jam = "19:00",
  lokasi = "IUP Room",
}) => {
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
        <Date tanggal={tanggal} className="hidden sm:block" />

        {/* LOCATION AND TIME */}
        <div className="flex gap-1">
          {/* location */}
          <div className="flex items-center gap-0.5 rounded-sm bg-custom-black p-1.5 pr-2.5">
            <MapPin className="h-4" />
            {lokasi}
          </div>

          {/* time */}
          <div className="rounded-sm bg-custom-black p-1.5">{jam}</div>
        </div>
      </div>

      {/* DATE on small screens */}
      <Date tanggal={tanggal} className="block sm:hidden" />
    </div>
  );
};

const Date = ({
  tanggal,
  className,
}: {
  tanggal: string;
  className?: string;
}) => <h1 className={`text-lg font-semibold ${className}`}>{tanggal}</h1>;

export default WaktuPilihanCard;
