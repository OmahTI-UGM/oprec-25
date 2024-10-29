import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import React from "react";

interface CardProps {
  title: string;
  date: string;
  description: string;
  showButton?: boolean; // Optional prop to conditionally show the button
}

const Card: React.FC<CardProps> = ({ title, date, description, showButton }) => {
  return (
    <div className="w-[290px] h-[130px] bg-custom-gray-dark rounded-lg p-4 flex flex-col justify-between shadow-md relative">
      <div>
        <h3 className="text-custom-silver text-xl font-semibold">{title}</h3>
        <p className="text-custom-silver text-sm font-semibold">{date}</p>
      </div>
      <p className="text-custom-silver text-sm">{description}</p>
      {showButton && (
        <button className="absolute right-4 top-5">
          <Info className="text-custom-silver w-5" />
        </button>
      )}
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card
        title="Pilih Divisi"
        date="23 Nov - 24 Nov"
        description="Memilih 2 divisi Himakom (Opsional) dan 2 divisi OmahTI (Opsional)"
      />
      <Card
        title="Penugasan"
        date="23 Nov - 24 Nov"
        description="Melakukan penugasan sesuai divisi"
      />
      <Card
        title="Wawancara"
        date="23 Nov - 24 Nov"
        description="Wawancara Himakom dan OmahTI sesuai divisi yang telah dipilih"
        showButton={true} // Show the button for this specific card
      />
      <Card
        title="Pengumuman"
        date="23 Nov - 24 Nov"
        description="Hasil Pengumuman OmahTI dan Himakom"
      />
    </div>
  );
};

export default Timeline;
