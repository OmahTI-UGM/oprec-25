import KelasPilihan from "@/modules/divisi/components/KelasPilihan";
import Card from "@/modules/divisi/components/Card";

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

      {/* Grid layout for Card components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card) => (
          <Card key={card.id} title={card.title} variant={card.variant} />
        ))}
      </div>
    </>
  );
}
