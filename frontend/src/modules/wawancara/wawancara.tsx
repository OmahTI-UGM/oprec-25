import Peringatan from "./components/peringatan";
import WaktuPilihan from "./components/WaktuPilihan";
import PilihanWaktu from "./components/PilihanJam";

import {getPilihanWawancara, getAllWawancara} from "@/utils/fetch";
import {getCurrentUser} from "@/utils/auth";
import { cookies } from "next/headers";

const Divisi = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const user = await getCurrentUser();
  const enrolledSlugHima = user?.enrolledSlugHima;
  const enrolledSlugOti = user?.enrolledSlugOti;
  const wawancara = await getAllWawancara();
  const {filteredHima, filteredOti} = await getPilihanWawancara(accessToken as string);
  console.log(filteredHima, filteredOti);
  
  return (
    <>
      <Title />
      <hr className={`my-4 border-2 border-custom-gray-dark`} />
      <Peringatan />
      <WaktuPilihan filteredHima={filteredHima} slugOti={enrolledSlugOti} slugHima={enrolledSlugHima} filteredOti={filteredOti}/>
      <PilihanWaktu />
    </>
  );
}

const Title = () => (
  <div className="mb-8">
    <h1 className="text-2xl font-semibold sm:text-4xl">Wawancara</h1>
    <p className={``}>
      Kamu hanya bisa memilih{" "}
      <span className={`font-semibold`}>Satu jadwal Himakom</span> dan{" "}
      <span className={`font-semibold`}>Satu jadwal OmahTI</span>
    </p>
  </div>
);

export default Divisi;