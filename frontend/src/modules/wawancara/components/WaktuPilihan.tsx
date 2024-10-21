import Card from "./WaktuPilihanCard";

const WaktuPilihan = () => {
  return (
    <div className="my-8">
      <h5 className="font-semibold">Waktu Wawancara yang Kamu Pilih</h5>
      <div className="flex flex-col gap-2 mt-2 xl:flex-row">
        <Card
          variant="omahti"
          tanggal="27 November 2024"
          jam="19:00"
          lokasi="IUP Room"
        />
        <Card
          variant="himakom"
          tanggal="27 November 2024"
          jam="19:00"
          lokasi="IUP Room"
        />
      </div>
    </div>
  );
};

export default WaktuPilihan;
