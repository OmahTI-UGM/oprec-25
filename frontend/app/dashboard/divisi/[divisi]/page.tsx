import { notFound } from "next/navigation";
import { divisi } from "@/helpers/divisi";

export const metadata = {
  title: "Divisi",
  description: "",
};

export function generateStaticParams() {
  return divisi.map((div) => ({
    divisi: div.id,
  }));
}

type DivisiPageProps = {
  params: {
    divisi: string;
  };
};

const Page = ({ params }: DivisiPageProps) => {
  const divisiData = divisi.find((div) => div.id === params.divisi);

  if (!divisiData) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{divisiData.nama}</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Tentang Divisi</h2>
          <p>{divisiData.tentang || "Belum ada deskripsi"}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Kegiatan</h2>
          {divisiData.kegiatan.namaKegiatan ? (
            <div>
              <h3 className="font-medium">{divisiData.kegiatan.namaKegiatan}</h3>
              {divisiData.kegiatan.fotoUrl && (
                <img
                  src={divisiData.kegiatan.fotoUrl}
                  alt={divisiData.kegiatan.namaKegiatan}
                  className="mt-2 rounded-lg"
                />
              )}
            </div>
          ) : (
            <p>Belum ada kegiatan</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Penugasan</h2>
          <p>{divisiData.penugasan || "Belum ada penugasan"}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;