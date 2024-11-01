// components
import DivisiPilihan from "./components/DivisiPilihan";
import DivisiLengkap from "./components/DivisiLengkap";
import Wawancara from "./components/Wawancara";
import { getCurrentUser } from "@/utils/auth";
import { getAllDivisi } from "@/utils/fetch";
const Divisi = async () => {
  const user = getCurrentUser();
  const divisi = await getAllDivisi();
  return (
    <>
      <Title />
    <h1>HALO {user?.username}</h1>
    <h1>NIM {user?.NIM}</h1>
    <h1>isAdmin {user?.isAdmin}</h1>
      {/* kelas yang dipilih user */}
      <DivisiPilihan />

      {/* kelas lengkap omahti dan himakom */}
      <div className="mt-4 flex flex-col gap-4">
        <DivisiLengkap variant="omahti" divisi={divisi.otiDivisi}/>
        <DivisiLengkap variant="himakom" divisi={divisi.himakomDivisi}/>
      </div>

      <Wawancara />
    </>
  );
};

const Title = () => (
  <div className="mb-8">
    <h1 className="text-2xl font-semibold sm:text-4xl">Divisi</h1>
    <p className={``}>
      Kamu hanya bisa memilih{" "}
      <span className={`font-semibold`}>Dua Divisi Himakom</span> dan{" "}
      <span className={`font-semibold`}>Dua Divisi OmahTI</span>
    </p>
  </div>
);

export default Divisi;
