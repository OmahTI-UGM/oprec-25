import KelasPilihan from "./components/KelasPilihan";
import KelasLengkap from "./components/KelasLengkap";
import Wawancara from "./components/Wawancara";

const Divisi = () => {
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold sm:text-4xl">Divisi</h1>
      <p className={``}>
        Kamu hanya bisa memilih{" "}
        <span className={`font-semibold`}>Dua Divisi Himakom</span> dan{" "}
        <span className={`font-semibold`}>Dua Divisi OmahTI</span>
      </p>
      <hr className={`my-4 border-2 border-custom-gray-dark`} />

      {/* kelas yang dipilih user */}
      <KelasPilihan />

      {/* kelas lengkap omahti dan himakom */}
      <div className="mt-4 flex flex-col gap-4">
        <KelasLengkap variant="omahti" />
        <KelasLengkap variant="himakom" />
      </div>

      <Wawancara />
    </>
  );
}

export default Divisi;