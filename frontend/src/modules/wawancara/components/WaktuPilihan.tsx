import Card from "./WaktuPilihanCard";
import Peringatan from "./peringatan";

const WaktuPilihan = ({
  filteredHima,
  filteredOti,
  slugOti,
  slugHima,
}: any) => {
  const isEmpty = !filteredHima && !filteredOti;

  return (
    <div className="my-8">
      <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-center lg:text-sm">
        <Peringatan />
        <h5 className="font-semibold lg:text-lg">
          Waktu Wawancara yang Kamu Pilih
        </h5>
      </div>
      <div className="mt-2 flex flex-col gap-2 xl:flex-row">
        {isEmpty ? (
          <p>Kamu belum memilih waktu wawancara, pilih waktu yang tersedia 😁</p>
        ) : (
          <>
            {filteredOti && (
              <Card
                variant="omahti"
                tanggal={filteredOti.tanggal}
                jam={filteredOti.sesi[0].jam}
                lokasi={filteredOti.sesi[0].slotDivisi[slugOti]?.lokasi}
              />
            )}
            {filteredHima && (
              <Card
                variant="himakom"
                tanggal={filteredHima.tanggal}
                jam={filteredHima.sesi[0].jam}
                lokasi={filteredHima.sesi[0].slotDivisi[slugHima]?.lokasi}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WaktuPilihan;
