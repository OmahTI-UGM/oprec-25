// components
import DivisiPilihan from "./components/DivisiPilihan";
import DivisiLengkap from "./components/DivisiLengkap";
import Wawancara from "./components/Wawancara";

const Divisi = () => {
  return (
    <>
      <Title />

      {/* kelas yang dipilih user */}
      <DivisiPilihan />

      {/* kelas lengkap omahti dan himakom */}
      <div className="mt-4 flex flex-col gap-4">
        <DivisiLengkap variant="omahti" />
        <DivisiLengkap variant="himakom" />
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
