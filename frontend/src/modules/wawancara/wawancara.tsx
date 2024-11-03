import Title from "./components/Title";
import Peringatan from "./components/peringatan";
import WaktuPilihan from "./components/WaktuPilihan";
import PilihanWaktu from "./components/PilihanJam";

import {getPilihanWawancara, getAllWawancara} from "@/utils/fetch";
import {getCurrentUser} from "@/utils/auth";
import { cookies } from "next/headers";
export default async function Divisi() {
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
