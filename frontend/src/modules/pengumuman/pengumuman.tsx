import { Smile } from "lucide-react";
import PopupPengumuman from "./components/PopupPengumuman";
import { getPenerimaanUser } from "@/utils/fetch";
import { cookies } from "next/headers";

const Pengumuman = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const { diterimaDi } = await getPenerimaanUser(accessToken as string);
  // Set your announcement release date here
  const releaseDate = new Date("2024-12-04T00:00:00Z");
  const currentDate = new Date();

  const isAnnouncementAvailable = currentDate >= releaseDate;

  return (
    <div className="space-y-8">
      <Title releaseDate={releaseDate} currentDate={currentDate}/>
      <div className="flex flex-col h-96 items-center justify-center gap-4 rounded-xl bg-custom-gray-dark p-6">
        <Smile size={100} />
        {!isAnnouncementAvailable ? (
          <>
            <h1 className="text-xl text-center font-medium">
              Kamu dapat membuka pengumuman
            </h1>
            <PopupPengumuman
              diterimaDi={diterimaDi}
            />
          </>
        ) : (
          <h1 className="text-xl text-center font-medium">
            Pengumuman belum tersedia. Silakan cek kembali pada tanggal{" "}
            {releaseDate.toLocaleDateString("id-ID")}.
          </h1>
        )}
      </div>
    </div>
  );
};

// title
const Title = ({releaseDate, currentDate}: {releaseDate: Date; currentDate: Date}) => (
  <>
  {(currentDate <= releaseDate) ? (
    <div>
    <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
    <p>
      Kamu dapat membuka hasil pengumuman pada{" "}
      <span className="font-semibold">{releaseDate.toLocaleDateString("id-ID")}</span>
    </p>
    </div>
  ) : (
    <div>
    <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
    <p>
      Kamu dapat membuka hasil pengumuman{" "}
      <span className="font-semibold">Open recruitment</span>
    </p>
    </div>
  )}
  </>
);

export default Pengumuman;
