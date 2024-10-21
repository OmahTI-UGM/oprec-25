import KelasPilihan from "@/modules/divisi/components/KelasPilihan";
import Card from "./components/Card";
import KelasLengkap from "./components/KelasLengkap";

export default function Divisi() {
  const cardData = [
    { id: 1, title: "UI/UX", variant: "omahti" },
    { id: 2, title: "Frontend", variant: "omahti" },
    { id: 3, title: "Treasurer", variant: "himakom" },
    { id: 4, title: "Public Rel", variant: "himakom" },
  ];

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold sm:text-4xl">Divisi</h1>
      <p>
        Kamu hanya bisa memilih{" "}
        <span className="font-semibold">Dua Divisi Himakom</span> dan{" "}
        <span className="font-semibold">Dua Divisi OmahTI</span>
      </p>
      <hr className="my-4 border-2 border-custom-gray-dark" />

      <KelasPilihan />

      <div className="mt-4 flex flex-col gap-2">
        <KelasLengkap variant="omahti" />
        <KelasLengkap variant="himakom" />
      </div>
    </>
  );
}
