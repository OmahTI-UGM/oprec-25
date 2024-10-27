import React from "react";
import Card from "./PilihanJamCard";

const PilihanWaktu = () => {
  return (
    <div className="my-8">
      <h5 className="font-semibold lg:text-lg">Pilihan Jam Wawancara</h5>
      <div className="flex flex-col gap-5 mt-2">
        <Card variant="omahti" />
        <Card variant="himakom" />
      </div>
    </div>
  );
};

export default PilihanWaktu;
