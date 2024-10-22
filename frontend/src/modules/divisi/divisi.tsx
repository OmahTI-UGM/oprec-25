import KelasPilihan from "./components/KelasPilihan";
import KelasLengkap from "./components/KelasLengkap";

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

      <KelasPilihan />
      <div className="mt-4 flex flex-col gap-2">
        <KelasLengkap variant="omahti" />
        <KelasLengkap />
      </div>
    </>
  );
}

export default Divisi;