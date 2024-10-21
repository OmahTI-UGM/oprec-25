import Card from "./Card";

export default function KelasPilihan() {
  const cardData = [
    { id: 1, title: "UI/UX", variant: "omahti" },
    { id: 2, title: "Frontend", variant: "omahti" },
    { id: 3, title: "Treasurer", variant: "himakom" },
    { id: 4, title: "Public Rel", variant: "himakom" },
  ];

  return (
    <>
      <p className={`font-semibold`}>Divisi yang Kamu Pilih</p>
      
      {/* Grid layout for Card components */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card) => (
          <Card key={card.id} title={card.title} variant={card.variant} />
        ))}
      </div>
    </>
  );
}
